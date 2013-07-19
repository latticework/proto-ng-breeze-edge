using System.Web.Mvc;

[assembly: WebActivator.PreApplicationStartMethod(
    // Order = 2 because must run AFTER BreezeSampleConfig
    typeof(MemTester.App_Start.BreezeClientSampleConfig), "RegisterBreezePreStart", Order = 2)]

namespace MemTester.App_Start {
  ///<summary>
  /// Inserts the Breeze MVC sample view controller to the front of all MVC routes
  /// so that the Breeze sample becomes the default page.
  ///</summary>
  ///<remarks>
  /// This class is discovered and run during startup
  /// http://blogs.msdn.com/b/davidebb/archive/2010/10/11/light-up-your-nupacks-with-startup-code-and-webactivator.aspx
  ///</remarks>
  public static class BreezeClientSampleConfig {

    public static void RegisterBreezePreStart() {

      // Preempt standard default MVC page routing to go to Breeze Sample
      System.Web.Routing.RouteTable.Routes.MapRoute(
          name: "BreezeMvc",
          url: "{controller}/{action}/{id}",
          defaults: new
          {
              controller = "BreezeSampleShell",
              action = "Index",
              id = UrlParameter.Optional
          }
      );
    }
  }
}