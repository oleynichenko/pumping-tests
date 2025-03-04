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
          exam: 1,
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

  async getExamResults(collection, permalink, minScore) {
    const filter = {
      score: { $gte: minScore },
      permalink,
    };

    return collection.find(filter, { sort: { updated: -1 } });
  }

  async getExamsResult(collection, permalinks, minScore) {
    const pipeline = [
      {
        $match: {
          permalink: { $in: permalinks },
          score: { $gte: minScore },
          // passDate: { $gte: minScore }, TODO add limit for pass dates and sort out update date vs result
        },
      },
      {
        $group: {
          _id: '$email',
          passes: {
            $push: {
              name: "$name",
              surname: "$surname",
              score: "$score",
              permalink: "$permalink",
            }
          }
        }
      }
    ];

    return collection.aggregate(pipeline)
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error('Теста с таким URL не существует');
        }

        return JSON.parse(JSON.stringify(data));
      });
  }

  async getPass(collection, email, permalink) {
    const filter = {
      email,
      permalink,
    };

    return collection.findOne(filter);
  }

  async getTest(testsCollection, questionsCollection, permalink, isExam) {
    const testPipeline = [
      { $match: { 'links.permalink': permalink, exam: { $exists: isExam } } },
      { $unwind: `$links` },
      { $match: { 'links.permalink': permalink } },
      { $lookup: {
          from: 'materials',
          localField: 'questions.themes',
          foreignField: "theme",
          as: "material"
        } },
      { $lookup: {
          from: 'terms',
          localField: 'questions.themes',
          foreignField: "theme",
          as: "terms"
        } },
      {
        $project: {
          title: 1,
          description: 1,
          additionalInfo: 1,
          links: 1,
          exam: 1,
          questions: 1,
          'levels.name': 1,
          'levels.feedback': 1,
          'levels.conclusionPhrase': 1,
          'levels.recommendation': 1,
          'levels.score': 1,
          'levels.color': 1,
          'material.content': 1,
          terms: 1
        },
      },
    ];

    return testsCollection.aggregate(testPipeline).then((data) => {
      if (!data || data.length === 0) {
        throw new Error('Теста с таким URL не существует');
      }

      const testData = JSON.parse(JSON.stringify(data[0]));

      const {
        questions: { themes },
        links: { questionsQuantity },
      } = testData;

      const sampleStage = questionsQuantity ? { $sample: { size: questionsQuantity } } : null;

      return questionsCollection
        .aggregate([
          {
            $match: { themes: { $in: themes } },
          },
          sampleStage,
          {
            $sort: { id: 1 },
          },
        ].filter(Boolean))
        .then((questionsData) => {
          return { ...testData, questionsData };
        });
    });
  }

  async getTestTitles(testsCollection, permalinks) {
    const pipeline = [
      { $match: { 'links.permalink': { $in: permalinks } } },
      { $unwind: `$links` },
      { $match: { 'links.permalink': { $in: permalinks } } },
      {
        $project: {
          title: 1,
          'links.permalink': 1
        },
      },
    ];

    return testsCollection.aggregate(pipeline).then((data) => {
      if (!data || data.length === 0) {
        throw new Error('Тестов для такого URL не существует');
      }

      return JSON.parse(JSON.stringify(data));
    });
  }

  async savePass(collection, data, newScore) {
    const { email, name, surname, permalink, score = [], passDate } = data;

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
      passDate: new Date(passDate),
      updated: new Date(),
    };

    if (newScore >= Math.max(score)) {
      // passDate - date of the max score result

      update.passDate = new Date();
    }

    return collection.updateOne(filter, update, { upsert: true }).then(() => update);
  }
}

const realmService = new RealmService();

export default realmService;
