using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjP2M.Data;
using ProjP2M.Models;

namespace ProjP2M.Services
{
    public class GustHouseService
    {
        private readonly IMongoCollection<GuestHouse> _GuestHouseCollection;
        public GustHouseService(
            IOptions<DatabaseSettings> databaseSettings) {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _GuestHouseCollection = mongoDatabase.GetCollection<GuestHouse>("GuestHouse");

        }
        public async Task<List<GuestHouse>> GetAsync() =>
        await _GuestHouseCollection.Find(_ => true).ToListAsync();

        public async Task<GuestHouse?> GetAsync(string id) =>
            await _GuestHouseCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(GuestHouse newGuestHouse) =>
            await _GuestHouseCollection.InsertOneAsync(newGuestHouse);

        public async Task UpdateAsync(string id, GuestHouse UpdatedGuestHouse) =>
            await _GuestHouseCollection.ReplaceOneAsync(x => x.Id == id, UpdatedGuestHouse);

        public async Task RemoveAsync(string id) => await _GuestHouseCollection.DeleteOneAsync(x => x.Id == id);


    }
}
