using System;
using System.Collections.Generic;
using System.Data.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                entityBuilder.Metadata = @"E:\Workspaces\gpitte\git\latticework\proto-ng-breeze-edge\net45\proto-edge-cs-net45\bin\Debug\ngprotoEFModel.csdl|E:\Workspaces\gpitte\git\latticework\proto-ng-breeze-edge\net45\proto-edge-cs-net45\bin\Debug\ngprotoEFModel.ssdl|E:\Workspaces\gpitte\git\latticework\proto-ng-breeze-edge\net45\proto-edge-cs-net45\bin\Debug\ngprotoEFModel.msl";
                var con = new EntityConnection(entityBuilder.ToString());
                Console.WriteLine(con.ConnectionString.ToString());                
                return con;
            }
        }
    }
}
