using Microsoft.Data.Edm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace proto_edge_cs_net45
{    
    interface ITodoService
    {
        object Savechange(Todo todo);
        object GetMetaData();
        Todo GetTodoById(int id);
        object GetTodoes(string query);            
    }
}
