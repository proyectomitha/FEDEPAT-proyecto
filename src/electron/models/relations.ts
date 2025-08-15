import { Club } from "./club.js";
import { Festival } from "./festival.js";
import { Member } from "./member.js";
import { TestHability } from "./testHability.js";
import { SerieReaction, TestReaction } from "./testReaction.js";
import { SerieResistance, TestResistance } from "./testResistance.js";
import {
  MemberTestHability,
  MemberSerieReaction,
  MemberSerieResistance,
} from "./memberTest.js";

export function make_relations() {
  // Miembro N:N TestHabilidad con tabla intermedia
  Member.belongsToMany(TestHability, {
    through: MemberTestHability,
    foreignKey: "memberId",
    otherKey: "testHabilityId",
    as: "testHabilitys",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });

  TestHability.belongsToMany(Member, {
    through: MemberTestHability,
    foreignKey: "testHabilityId",
    otherKey: "memberId",
    as: "members",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // Miembro N:N SerieReacción con tabla intermedia
  Member.belongsToMany(SerieReaction, {
    through: MemberSerieReaction,
    foreignKey: "memberId",
    otherKey: "serieReactionId",
    as: "serieReactions",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  SerieReaction.belongsToMany(Member, {
    through: MemberSerieReaction,
    foreignKey: "serieReactionId",
    otherKey: "memberId",
    as: "members",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // Miembro N:N SerieResistencia con tabla intermedia
  Member.belongsToMany(SerieResistance, {
    through: MemberSerieResistance,
    foreignKey: "memberId",
    otherKey: "serieResistanceId",
    as: "serieResistances",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  SerieResistance.belongsToMany(Member, {
    through: MemberSerieResistance,
    foreignKey: "serieResistanceId",
    otherKey: "memberId",
    as: "members",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // Miembro N:1 club
  Club.hasMany(Member);
  Member.belongsTo(Club);

  // Miembro N:N festival
  Festival.belongsToMany(Member, {
    through: "MemberFestival",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Member.belongsToMany(Festival, {
    through: "MemberFestival",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // TestHabilidad N:1 festival
  Festival.hasMany(TestHability, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  TestHability.belongsTo(Festival);

  // TestReacción N:1 festival
  Festival.hasMany(TestReaction, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  TestReaction.belongsTo(Festival);

  // TestReacción 1:N SerieReaccion
  TestReaction.hasMany(SerieReaction, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  SerieReaction.belongsTo(TestReaction);

  // TestResistencia N:1 festival
  Festival.hasMany(TestResistance, {
    foreignKey: "festivalId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  TestResistance.belongsTo(Festival);

  // TestResistance 1:N SerieResistance
  TestResistance.hasMany(SerieResistance, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  SerieResistance.belongsTo(TestResistance);
}
