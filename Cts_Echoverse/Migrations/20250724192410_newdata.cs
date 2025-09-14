using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EchoVerse_API.Migrations
{
    /// <inheritdoc />
    public partial class newdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "Music");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Music",
                newName: "FilePath");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Music",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Artist",
                table: "Music",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Album",
                table: "Music",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Music",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DurationInSeconds",
                table: "Music",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReleaseYear",
                table: "Music",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Album",
                table: "Music");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Music");

            migrationBuilder.DropColumn(
                name: "DurationInSeconds",
                table: "Music");

            migrationBuilder.DropColumn(
                name: "ReleaseYear",
                table: "Music");

            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "Music",
                newName: "Category");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Music",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Artist",
                table: "Music",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReleaseDate",
                table: "Music",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
