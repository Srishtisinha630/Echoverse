using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EchoVerse_API.Migrations
{
    /// <inheritdoc />
    public partial class MakeCategoryNameUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Categories_CategoryName",
                table: "Categories",
                column: "CategoryName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Categories_CategoryName",
                table: "Categories");
        }
    }
}
