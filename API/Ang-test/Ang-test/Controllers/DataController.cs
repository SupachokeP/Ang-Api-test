using Microsoft.AspNetCore.Mvc;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Dapper;
namespace Ang_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase 
    {
        
        private static string connectionString = "Server=(localdb)\\localDB1;Database=Agl_Product;Integrated Security=True;";

        protected SqlConnection GetOpenConnection(string ConnName = null)
        {
            SqlConnection connection = null;
            if (!string.IsNullOrEmpty(connectionString))
            {
                connection = new SqlConnection(connectionString);
                connection.Open();
            }

            return connection;
        }
    
        [HttpGet("GetProductData")]
        public List<ProductRes> GetSomething()
        {
            var data = new List<ProductRes>();
            using (IDbConnection dbConnection = GetOpenConnection())
            try
            {
                StringBuilder sQuery = new StringBuilder();
                sQuery.Append(@" SELECT  *  FROM TBM_Product_New with(nolock)");

                data = dbConnection.Query<ProductRes>(sQuery.ToString()).ToList();
                }
            catch (Exception)
            {

                throw;
            }

            return data;
        }
    }

}
