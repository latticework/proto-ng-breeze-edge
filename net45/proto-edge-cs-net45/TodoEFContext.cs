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

       
       

    }
}



