using Microsoft.Data.Edm;
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
using System.Data.Entity;
using System.Reflection;
using System.IO;

namespace proto_edge_cs_net45
{
    public class TodoFakeService : ServiceBase, ITodoService 
    {
        static IList<Todo> _todoes = new List<Todo>();
        public TodoFakeService()
        {
            _todoes = new List<Todo>();
            TodoDetail tddtails = new TodoDetail();
            tddtails.TodoId = 1;
            tddtails.TodoDetailId = 1;
            tddtails.Details = "details from sample";
            _todoes.Add(new Todo
            {
                TodoId = 1,
                Title = "Title 1",
                Completed = true,
                Description = "Sample Title 1",
                TodoDetails = { tddtails }

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
        public object Savechange(Todo todo)
        {
            UpdateGenerateTodoId(todo);
            _todoes.Add(todo);
            return GetTodoes("");
        }

        public object GetMetaData()
        {              
            string result = "";
            using (StreamReader reader = new StreamReader(Assembly.GetExecutingAssembly().GetManifestResourceStream(Assembly.GetExecutingAssembly().GetName().Name+".FakeTodoMetadat.json")))
            {
                result = reader.ReadToEnd();
            }
            return result;
        }

        public Todo GetTodoById(int id)
        {           
            return _todoes.FirstOrDefault(t => t.TodoId == id);
        }

        public object GetTodoes(string query)
        {
            return GettodoByQuery(query);
        }
        private object GettodoByQuery(object queryString)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "http://server/" + queryString);
            var odataQuery = new ODataQueryOptions<Todo>(new ODataQueryContext(GetEdmModel(), typeof(Todo)), request);
            var query = _todoes.AsQueryable().Include(t => t.TodoDetails);
            return JsonConvert.SerializeObject(odataQuery.ApplyTo(query), new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                Formatting = Formatting.Indented
            });
        }
        private static IEdmModel GetEdmModel()
        {
            ODataModelBuilder modelBuilder = new ODataConventionModelBuilder();
            modelBuilder.EntitySet<Todo>("Todoes");
            modelBuilder.EntitySet<TodoDetail>("TodoDetails");
            return modelBuilder.GetEdmModel();
        }
        private void UpdateGenerateTodoId(Todo todo)
        {
            int todoid = new Random().Next(10, 50);
            todo.TodoId = todoid;
            if (todo.TodoDetails != null)
            {
                foreach (TodoDetail td in todo.TodoDetails)
                {
                    td.TodoId = todo.TodoId;
                    td.TodoDetailId = new Random().Next(51, 100);
                }
            }
        }
    }

}
