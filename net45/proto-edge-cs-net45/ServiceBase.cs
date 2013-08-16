using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Metadata.Edm;
using System.Data.Objects;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace proto_edge_cs_net45
{
    public abstract class ServiceBase
    {        
        public string GetMetadataFromDbContext(DbContext dbContext)
        {
            XDocument obj = XDocument.Load(@"net45\proto-edge-cs-net45\bin\debug\ngprotoEFModel.csdl");
            ObjectContext oc = get_ObjectContext(dbContext);
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
}
