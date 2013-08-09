using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace proto_edge_cs_net45
{
    public class Startup
    {
       
        public async Task<object> Invoke(object input)
        {
            //throw new Exception("I am the exceotion comeing all the way from .Net !!!");
            System.Console.WriteLine("****From .Net********");
            System.Console.WriteLine(input);
            
            System.Console.WriteLine("****leaving .Net********");
            return "Output::\n" + input;         
        }
    }
   
}
