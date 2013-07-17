﻿using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using Irony.Parsing;


using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;
using System.Web;
using System.Net.Http.Formatting;


namespace Breeze.WebApi {
  /// <summary>
  /// Configure the Web API settings for this Breeze Controller
  /// </summary>
  /// <remarks>
  /// Clears all <see cref="MediaTypeFormatter"/>s and 
  /// adds the Breeze formatter for JSON content.
  /// Removes the competing ASP.NET Web API's QueryFilterProvider if present. 
  /// Adds <see cref="BreezeFilterProvider"/> for OData query processing
  /// </remarks>
  [AttributeUsage(AttributeTargets.Class)]
  public class LegacyBreezeControllerAttribute : Attribute, IControllerConfiguration {

    /// <summary>
    /// Initialize the Breeze controller with a single <see cref="MediaTypeFormatter"/> for JSON
    /// and a single <see cref="IFilterProvider"/> for Breeze OData support
    /// </summary>
    public void Initialize(HttpControllerSettings settings, HttpControllerDescriptor descriptor) {
      lock (__lock) {
        // Remove the Web API's "QueryFilterProvider" 
        // and any previously added Breeze ODataActionFilterProvider.
        // Add the value from BreezeFilterProvider()
        settings.Services.RemoveAll(typeof(IFilterProvider),
                                    f => (f.GetType().Name == "QueryFilterProvider")
                                         || (f is ODataActionFilterProvider));
        settings.Services.Add(typeof(IFilterProvider), BreezeFilterProvider());

        // remove all formatters and add only the Breeze JsonFormatter
        settings.Formatters.Clear();
        settings.Formatters.Add(BreezeJsonFormatter());

      }
    }

    /// <summary>
    /// Return the <see cref="IFilterProvider"/> for a Breeze Controller
    /// </summary>
    /// <remarks>
    /// By default returns an <see cref="ODataActionFilterProvider"/>.
    /// Override to substitute a custom provider.
    /// </remarks>
    protected virtual IFilterProvider BreezeFilterProvider() {
      return DefaultBreezeFilterProvider;
    }

    /// <summary>
    /// Return the Breeze-specific <see cref="MediaTypeFormatter"/> that formats
    /// content to JSON. This formatter must be tailored to work with Breeze clients. 
    /// </summary>
    /// <remarks>
    /// By default returns the Breeze <see cref="JsonFormatter"/>.
    /// Override it to substitute a custom JSON formatter.
    /// </remarks>
    protected virtual MediaTypeFormatter BreezeJsonFormatter() {
      return DefaultBreezeJsonFormatter;
    }

    

    private static object __lock = new object();


    // These instances are stateless and threadsafe so can use static versions for all controller instances
    private static readonly IFilterProvider DefaultBreezeFilterProvider = new ODataActionFilterProvider();
    private static readonly MediaTypeFormatter DefaultBreezeJsonFormatter = JsonFormatter.Create();
  }

  
  

}
