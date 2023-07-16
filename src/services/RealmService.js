class RealmService {
  async getExam(collection, name) {
    const pipeline = [
      {$match: {'links.permalink': name}},
      {$unwind: `$links`},
      {$match: {'links.permalink': name}},
      {
        $project: {
          title: 1,
          description: 1,
          links: 1,
          'levels.conclusionPhrase': 1,
          'levels.score': 1,
        },
      },
    ];

    return collection.aggregate(pipeline).then((data) => {
      if (!data || data.length === 0) {
        throw new Error('Теста с таким URL не существует');
      }

      return JSON.parse(JSON.stringify(data[0]));
    });
  }
  
  async getTest() {

  }
}

export default new RealmService();
