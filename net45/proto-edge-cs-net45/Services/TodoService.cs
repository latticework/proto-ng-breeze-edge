using Microsoft.Data.Edm;
using Newtonsoft.Json;
using System;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http.OData;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Query;

namespace proto_edge_cs_net45
{   
    public class TodoService : ServiceBase, ITodoService 
    {
        public object Savechange(Todo todo)
        {
            TodoEFContext todoDbContext = new TodoEFContext();                        
            todoDbContext.Todoes.Add(todo);
            todoDbContext.Entry(todo).State = System.Data.EntityState.Added;
            if (todoDbContext.GetValidationErrors().Count() > 0)
            {
                throw new Exception("Validation errors!");
            }
            todoDbContext.SaveChanges();
            return GetTodoes("");
        }

        public object GetMetaData()
        {
            TodoEFContext todoDbContext = new TodoEFContext();
            return base.GetMetadataFromDbContext(todoDbContext);   
        }

        public Todo GetTodoById(int id)
        {
            TodoEFContext todoDbContext = new TodoEFContext();           
            return todoDbContext.Todoes.FirstOrDefault(t => t.TodoId == id);
        }

        public object GetTodoes(string query)
        {
            return GettodoByQuery(query);
        }
        private object GettodoByQuery(object queryString)
        {
            TodoEFContext todoDbContext = new TodoEFContext();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://server/" + queryString);
            var odataQuery = new ODataQueryOptions<Todo>(new ODataQueryContext(GetEdmModel(), typeof(Todo)), request);         
            return JsonConvert.SerializeObject(odataQuery.ApplyTo(todoDbContext.Todoes.Include(t => t.TodoDetails)), new JsonSerializerSettings()
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
    } 
}