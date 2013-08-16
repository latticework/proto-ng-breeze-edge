using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace proto_edge_cs_net45
{    
    public class TodoController
    {
        ITodoService service = null;
        public TodoController()
        {
            //Get it from Ioc
            service = new TodoService();
        }
        #region Live
        public async Task<object> GetTodoes(object queryString)
        {           
            return service.GetTodoes(queryString.ToString());
        }
        public async Task<object> GetTodoById(object todoId)
        {
            return service.GetTodoById(int.Parse(todoId.ToString()));
        }       
        public async Task<object> SaveChanges(object input)
        {
            Console.WriteLine(input.ToString());
            Todo entity = JsonConvert.DeserializeObject<Todo>(input.ToString());
            return service.Savechange(entity);
        }
        public async Task<object> GetMetaData(object input)
        {
            return service.GetMetaData();
        }
        #endregion Live

        #region Fake
        public async Task<object> GetFakeTodoes(object queryString)
        {
            service = new TodoFakeService();
            return service.GetTodoes(queryString.ToString());
        }         
        public async Task<object> GetFakeTodoById(object todoId)
        {
            service = new TodoFakeService();
            return service.GetTodoById(int.Parse(todoId.ToString()));
        }
        public async Task<object> SaveFakeChanges(object input)
        {
            service = new TodoFakeService();
            Todo entity = JsonConvert.DeserializeObject<Todo>(input.ToString());
            return service.Savechange(entity);
        }       
        public async Task<object> GetFakeMetaData(object input)
        {
            service = new TodoFakeService();
            return service.GetMetaData();
        }
        #endregion Fake
    }
}
