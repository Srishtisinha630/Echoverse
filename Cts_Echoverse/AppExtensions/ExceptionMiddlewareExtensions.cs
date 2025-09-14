using Microsoft.AspNetCore.Diagnostics;

namespace Echoverse_API.AppExtensions
{
    
        public static class ExceptionMiddlewareExtensions
        {
            public static void UseProductExceptionHandler(this IApplicationBuilder app, ILogger logger)
            {
                //Step -1
                app.UseExceptionHandler(error =>
                {
                    //Step -2 Exception handling logic
                    error.Run(async context =>
                    {
                        //Step -3 context.Features.Get<IExceptionHandlerFeature>() will identify the exact exception occured.
                        var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                        if (contextFeature != null)
                        {
                            logger.LogError($"Error Occured : {contextFeature.Error}");
                            var errorDetails = new ErrorDetails { StatusCode = 500, Message = "Something went wrong...." };
                            await context.Response.WriteAsJsonAsync(errorDetails);
                        }

                    });
                });
            }
        }
    }

