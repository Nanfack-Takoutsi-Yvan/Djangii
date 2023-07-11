import { tontinesSelector } from "@services/store/slices/tontines"
import { getDate } from "@services/utils/functions/format"

export const getSessionsContributionsData = () =>
  tontinesSelector.getAllTontineSessions()

export const sessionsCLosedContributionData = (sessions: ITontineSession[]) =>
  sessions
    .filter(session => session.status === "CLOSED")
    .map(session => [
      getDate(session.datation.creationTime),
      session.tontineRound.tontine.name,
      session.tontineRound.tontine.amount,
      session.jackpot,
      session.roundReserve,
      session.tontineRound.tontine.type,
      session.status
    ])

export const sessionsOpenedContributionData = (sessions: ITontineSession[]) =>
  sessions
    .filter(session => session.status === "OPENED")
    .map(session => [
      getDate(session.datation.creationTime),
      session.tontineRound.tontine.name,
      session.tontineRound.tontine.amount,
      session.jackpot,
      session.roundReserve,
      session.tontineRound.tontine.type,
      session.status
    ])

export const sessionsProgrammedContributionData = (
  sessions: ITontineSession[]
) =>
  sessions
    .filter(session => session.status === "PROGRAMMED")
    .map(session => [
      getDate(session.datation.creationTime),
      session.tontineRound.tontine.name,
      session.tontineRound.tontine.amount,
      session.jackpot,
      session.roundReserve,
      session.tontineRound.tontine.type,
      session.status
    ])
