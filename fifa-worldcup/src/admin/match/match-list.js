//import moment from 'moment';

export class MatchList {


  matchList = [

    {
      team_1: "Peru",
      team_2: "Brazil",
      team_1_goals: 0,
      team_2_goals: 3,
      match_date: "15/06/18 - 09:00",
      status: "FINISHED"
    },
    {
      team_1: "Alemania",
      team_2: "Italia",
      team_1_goals: 2,
      team_2_goals: 0,
      match_date: "15/06/18 - 09:00",
      status: "PENDING"
    },
    {
      team_1: "England",
      team_2: "Portugal",
      team_1_goals: 2,
      team_2_goals: 0,
      match_date: "15/06/18 - 09:00",
      status: "PENDING"
    },
    {
      team_1: "Egipt",
      team_2: "Colombia",
      team_1_goals: 0,
      team_2_goals: 3,
      match_date: "15/06/18 - 09:00",
      status: "FINISHED"
    },
    {
      team_1: "Peru",
      team_2: "Brazil",
      team_1_goals: 0,
      team_2_goals: 3,
      match_date: "08/04/18 - 04:00",
      status: "PENDING"
    },

  ];

  pendingMatches = []
  liveMatches = []
  finishedMatches = []

  attached(){

    /*for (let match in this.matchList) {
      if (match.status === 'FINISHED') {
        this.finishedMatches.push(match)
      } else if (match.status === 'PENDING'){
        if(moment(match.match_date).isAfter(moment().hours(3))){
          this.pendingMatches.push(match)
        } else {
          this.liveMatches.push(match)
        }
      }
    }*/

  }

}
