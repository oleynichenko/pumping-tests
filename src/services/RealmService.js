class RealmService {
  async getExam(collection, name) {
    const pipeline = [
      { $match: { 'links.permalink': name, exam: { $exists: true } } },
      { $unwind: `$links` },
      { $match: { 'links.permalink': name } },
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

  async getExamResults(collection, permalink) {
    const filter = {
      updated: { $exists: true },
      permalink,
    };

    return collection.find(filter, { sort: { updated: -1 } });
  }

  async getPass(collection, email, permalink) {
    const filter = {
      email,
      permalink,
    };

    return collection.findOne(filter);
  }

  async savePass(collection, userData, newScore, examMinScore) {
    const { email, name, surname, permalink, score = [] } = userData;

    const filter = {
      email,
      permalink,
    };

    const update = {
      score: [...score, newScore],
      name,
      surname,
      email,
      permalink,
      updated: new Date(),
    };

    if (newScore > examMinScore) {
      update.passDate = new Date();
    }

    return collection
      .updateOne(filter, update, { upsert: true })
      .then(() => update);
  }
}

const realmService = new RealmService();
export default realmService;
