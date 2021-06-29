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
    allowNull: true,
  },
  song_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "songs",
      key: "id",
    },
  },
});

const Artist = sequelize.define("Artist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "artists",
      key: "id",
    },
  },
});

const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("connected");

    const MPeople = await Song.create({ name: "Moving On Up" });
    const HeatherSmall = await User.create({
      name: "Heather Small",
      location_id: MPeople.id,
    });

    const song = await song.findOne({
      where: {
        location_id: 1,
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
