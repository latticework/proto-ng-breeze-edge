//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace proto_edge_cs_net45
{
    using System;
    using System.Collections.Generic;
    
    public partial class TodoDetail
    {
        public int TodoDetailId { get; set; }
        public int TodoId { get; set; }
        public string Details { get; set; }
        public string CompletedBy { get; set; }
        public Nullable<System.DateTime> CompletedDate { get; set; }
    
        public virtual Todo Todo { get; set; }
    }
}
