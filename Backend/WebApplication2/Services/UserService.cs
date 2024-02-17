﻿using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication2.Helpers;
using WebApplication2.Models;

namespace WebApplication2.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> users;
        private readonly string key;

        public UserService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("ConnectionString"));
            var database = client.GetDatabase("ConnectionString");
            users = database.GetCollection<User>("Users");
            key = configuration.GetSection("JwtKey").ToString();
        }

        public List<User> GetUsers() => users.Find(user => true).ToList();

        public User GetUser(string id) => users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User CreateUser(User user)
        {
            // Hash the password before storing it in the database
            user.Password = PasswordHasher.HashPassword(user.Password);

            // Insert the hashed password into the database
            users.InsertOne(user);
            return user;
        }

        public string Authenticate(string email, string password)
        {
            string hashedPassword = PasswordHasher.HashPassword(password);

            var user = users.Find(x => x.Email == email && x.Password == hashedPassword).FirstOrDefault();
            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.NameIdentifier,$"{user.Id}"),
                    new Claim(ClaimTypes.Webpage, user.ImageUrl),

                }),

                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public User GetUserByEmail(string email)
        {
            var user = users.Find(x => x.Email == email).FirstOrDefault();
            return user;
        }

        public void UpdateUser(User user)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);
            var update = Builders<User>.Update
                .Set(u => u.ImageUrl, user.ImageUrl);

            
            users.UpdateOne(filter, update);
        }
    }
}