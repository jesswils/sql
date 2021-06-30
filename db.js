const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize(
  "mysql://root:PASSWORD@localhost:3306/master24"
);

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

const Song = sequelize.define("Song", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Artists", //Model is referring to table
      key: "id", //Key refers to table column
    },
  },
});

const Artist = sequelize.define("Artist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("connected");

    const HeatherSmall = await Artist.create({
      name: "Heather Small",
    });
    const JheneAiko = await Artist.create({
      name: "Jhene Aiko",
    });
    const MarcRebilliet = await Artist.create({
      name: "Marc Rebilliet",
    });

    const MPeople = await Song.create({
      name: "Moving On Up",
      artist_id: HeatherSmall.id,
    });
    const Happiness = await Song.create({
      name: "Happiness Over Everything",
      artist_id: JheneAiko.id,
    });
    const Flamingo = await Song.create({
      name: "I'm a flamingo",
      artist_id: MarcRebilliet.id,
    });

    const song = await Song.findOne({
      where: {
        id: 1,
      },
    });

    console.log(song);

    await sequelize.close();
    console.log("Disconnected");
  } catch (error) {
    console.log(error);
  }
};

run();
