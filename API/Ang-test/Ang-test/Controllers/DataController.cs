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

        protected SqlConnection GetOpenConnection()
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
        public async Task<IActionResult> GetProductData()
        {
            try
            {
                using (IDbConnection dbConnection = GetOpenConnection())
                {
                    var data = await dbConnection.QueryAsync<ProductRes>("SELECT * FROM TBM_Product_New with(nolock)");
                    return Ok(data.ToList());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching product data.");
            }
        }
        [HttpPost("AddProduct")]
        public IActionResult AddProduct(ProductRes product)
        {
            using (IDbConnection dbConnection = GetOpenConnection())
            {
                try
                {
                    string query = @"INSERT INTO TBM_Product_New (ProductId, Name, ProductGroup, SupGroup, Status, Qty)
                                 VALUES (@ProductId, @Name, @ProductGroup, @SupGroup, @Status, @Qty)";
                    dbConnection.Execute(query, product);
                    return Ok("Product added successfully");
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error adding product: {ex.Message}");
                }
            }
        }
        [HttpPut("UpdateProduct")]
        public IActionResult UpdateProduct(ProductUpdateModel updateModel)
        {
            using (IDbConnection dbConnection = GetOpenConnection())
            {
                try
                {
                    string query = @"UPDATE TBM_Product_New
                             SET Status = @Status
                             WHERE ProductId = @ProductId";
                    dbConnection.Execute(query, updateModel);
                    return Ok("Product updated successfully");
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error updating product: {ex.Message}");
                }
            }
        }
        [HttpDelete("DeleteProduct/{productId}")]
        public IActionResult DeleteProduct(string productId)
        {
            using (IDbConnection dbConnection = GetOpenConnection())
            {
                try
                {
                    string query = @"DELETE FROM TBM_Product_New WHERE ProductId = @ProductId";
                    dbConnection.Execute(query, new { ProductId = productId });
                    return Ok("Product deleted successfully");
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error deleting product: {ex.Message}");
                }
            }
        }

    }

}
