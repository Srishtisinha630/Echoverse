using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EchoVerse_API.Migrations
{
    /// <inheritdoc />
    public partial class finallest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Music_Categories_CategoryId",
                table: "Music");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Music",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Music_Categories_CategoryId",
                table: "Music",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Music_Categories_CategoryId",
                table: "Music");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Music",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Music_Categories_CategoryId",
                table: "Music",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
