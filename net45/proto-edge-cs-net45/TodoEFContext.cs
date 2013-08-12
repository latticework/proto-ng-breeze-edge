using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.EntityClient;
using System.Data.Metadata.Edm;
using System.Data.Objects;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;

namespace proto_edge_cs_net45
{
    public partial class TodoEFContext
    {
        public static EntityConnection connection
        {
            get
            {
                string providerName = "System.Data.SqlClient";
                string serverName = "SQL105ATL1D";
                //metadata=.\ngprotoEFModel.csdl|.\ngprotoEFModel.ssdl|.\ngprotoEFModel.msl;provider=System.Data.SqlClient;provider connection string="data source=SQL105ATL1D;initial catalog=;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"
                string databaseName = "SCM_DEV";

                // Initialize the connection string builder for the
                // underlying provider.
                SqlConnectionStringBuilder sqlBuilder = new SqlConnectionStringBuilder();

                // Set the properties for the data source.
                sqlBuilder.DataSource = serverName;
                sqlBuilder.InitialCatalog = databaseName;
                sqlBuilder.IntegratedSecurity = true;

                // Build the SqlConnection connection string.
                string providerString = sqlBuilder.ToString();

                SqlConnection conn = new SqlConnection(providerString);
                Console.WriteLine("#########################################################################3");
                Console.WriteLine("#########################################################################3");
                Console.WriteLine("#########################################################################3");
                conn.Open();
                Console.WriteLine("*****************************");
                Console.WriteLine("*****************************");
                Console.WriteLine("*****************************");
                Console.WriteLine("*****************************");

                // Initialize the EntityConnectionStringBuilder.
                EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();

                //Set the provider name.
                entityBuilder.Provider = providerName;

                // Set the provider-specific connection string.
                entityBuilder.ProviderConnectionString = providerString;

                // Set the Metadata location.
                //entityBuilder.Metadata = @"E:\Workspaces\gpitte\git\latticework\proto-ng-breeze-edge\net45\proto-edge-cs-net45\bin\Debug\ngprotoEFModel.csdl|E:\Workspaces\gpitte\git\latticework\proto-ng-breeze-edge\net45\proto-edge-cs-net45\bin\Debug\ngprotoEFModel.ssdl|E:\Workspaces\gpitte\git\latticework\proto-ng-breeze-edge\net45\proto-edge-cs-net45\bin\Debug\ngprotoEFModel.msl";
                entityBuilder.Metadata = @"net45\proto-edge-cs-net45\bin\debug\ngprotoEFModel.csdl|net45\proto-edge-cs-net45\bin\debug\ngprotoEFModel.ssdl|net45\proto-edge-cs-net45\bin\debug\ngprotoEFModel.msl";



                var con = new EntityConnection(entityBuilder.ToString());
                Console.WriteLine(con.ConnectionString.ToString());
                return con;
            }
        }

        public string GetMetadataFromDbContext()
        {   
         
            XDocument obj = XDocument.Load(@"net45\proto-edge-cs-net45\bin\debug\ngprotoEFModel.csdl");
            
            ObjectContext oc = get_ObjectContext(this);
            return XDocToJson(UpdateCSpaceOSpaceMapping(obj, oc));
        }
        private ObjectContext get_ObjectContext(DbContext context)
        {
            var adapter = (IObjectContextAdapter)context;
            return adapter.ObjectContext;

        }
        private string XDocToJson(XDocument xDoc)
        {
            StringWriter textWriter = new StringWriter();
            using (JsonPropertyFixupWriter writer2 = new JsonPropertyFixupWriter(textWriter))
            {
                JsonSerializer serializer = new JsonSerializer();
                XmlNodeConverter item = new XmlNodeConverter();
                //serializer.get_Converters().Add(item);
                serializer.Serialize(writer2, xDoc);
            }
            return textWriter.ToString();
        }
        private XDocument UpdateCSpaceOSpaceMapping(XDocument xDoc, ObjectContext oc)
        {
            MetadataWorkspace metadataWorkspace = oc.MetadataWorkspace;
            Assembly assembly = oc.GetType().Assembly;
            metadataWorkspace.LoadFromAssembly(assembly);
            return UpdateCSpaceOSpaceMappingCore(xDoc, metadataWorkspace);
        }
        private XDocument UpdateCSpaceOSpaceMappingCore(XDocument xDoc, MetadataWorkspace metadataWs)
        {
            string str = JsonConvert.SerializeObject(Enumerable.Select<StructuralType, string[]>(Enumerable.Where<StructuralType>(metadataWs.GetItems<StructuralType>(DataSpace.CSpace), delegate(StructuralType st)
            {
                return !(st is AssociationType);
            }), delegate(StructuralType st)
            {
                StructuralType objectSpaceType = metadataWs.GetObjectSpaceType(st);
                return new string[] { st.FullName, objectSpaceType.FullName };
            }).ToList<string[]>());
            xDoc.Root.SetAttributeValue("CSpaceOSpaceMapping", str);
            return xDoc;
        }



    }
}
public class JsonPropertyFixupWriter : JsonTextWriter
{
    // Fields
    private bool _isDataType;

    // Methods
    public JsonPropertyFixupWriter(TextWriter textWriter)
        : base(textWriter)
    {
        this._isDataType = false;
    }

    private static string ToCamelCase(string s)
    {
        if (!(!string.IsNullOrEmpty(s) && char.IsUpper(s[0])))
        {
            return s;
        }
        string str = char.ToLower(s[0], CultureInfo.InvariantCulture).ToString(CultureInfo.InvariantCulture);
        if (s.Length > 1)
        {
            str = str + s.Substring(1);
        }
        return str;
    }

    public override void WritePropertyName(string name)
    {
        if (name.StartsWith("@"))
        {
            name = name.Substring(1);
        }
        name = ToCamelCase(name);
        this._isDataType = name == "type";
        base.WritePropertyName(name);
    }

    public override void WriteValue(string value)
    {
        if (!(!this._isDataType || value.StartsWith("Edm.")))
        {
            base.WriteValue("Edm." + value);
        }
        else
        {
            base.WriteValue(value);
        }
    }
}


