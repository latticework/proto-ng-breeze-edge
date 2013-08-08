using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.OData;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Query;

namespace proto_edge_cs_net45
{
    public class TodoContext
    {
        IList<Todo> _todoes = new List<Todo>();
        public TodoContext()
        {
            _todoes.Add(new Todo
            {
                TodoId = 1,
                Title = "Title 1",
                Completed = true,
                Description = "Sample Title 1"
            });
            _todoes.Add(new Todo
            {
                TodoId = 2,
                Title = "Title 2",
                Completed = false,
                Description = "Sample Title 2"
            });
            _todoes.Add(new Todo
            {
                TodoId = 3,
                Title = "Title 3",
                Completed = true,
                Description = "Sample Title 3"
            });
            _todoes.Add(new Todo
            {
                TodoId = 4,
                Title = "Title 4",
                Completed = false,
                Description = "Sample Title 4"
            });
            _todoes.Add(new Todo
            {
                TodoId = 5,
                Title = "Title 5",
                Completed = true,
                Description = "Todo from critetia"
            });
        }
        
        public async Task<object> GetTodo(object todoId)
        {            
            return _todoes.FirstOrDefault(t => t.TodoId == int.Parse(todoId.ToString()));
           
        }
        public async Task<object> GetAllTodoes(object queryString)
        {
            return GettodoByQuery(queryString);            
        }
        public async Task<object> GettodoByCriteria(object input)
        {
            Console.WriteLine("***From CRL!!***");
            Console.WriteLine(input.ToString());
            Todo todoCriteria = JsonConvert.DeserializeObject<Todo>(input.ToString());
            return _todoes.Where(t => t.Completed == todoCriteria.Completed);          
        }

        private IQueryable  GettodoByQuery(object queryString)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:8080" + queryString);
            ODataModelBuilder modelBuilder = new ODataConventionModelBuilder();
            modelBuilder.EntitySet<Todo>("Todoes");
            var odataQuery = new ODataQueryOptions<Todo>(new ODataQueryContext(modelBuilder.GetEdmModel(), typeof(Todo)), request);
            var results = odataQuery.ApplyTo(_todoes.AsQueryable());
            return results.AsQueryable();
        }
        private string ToQueryString(IDictionary<string, object> dict)
        {
            if (dict == null || dict.Count == 0) return string.Empty;

            var buffer = new StringBuilder();
            int count = 0;
            bool end = false;

            foreach (var key in dict.Keys)
            {
                if (count == dict.Count - 1) end = true;

                if (end)
                    buffer.AppendFormat("{0}={1}", key, dict[key]);
                else
                    buffer.AppendFormat("{0}={1}&", key, dict[key]);

                count++;
            }

            return buffer.ToString();
        }

    }
}


//https://github.com/visionmedia/node-querystring
//Breeze Metata and SaveChange from BreezeController
//Express Routing engine :) 
//ODataQueryOptions 
//express videos: http://www.youtube.com/watch?v=uto2gVZarZU