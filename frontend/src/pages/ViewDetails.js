import React from 'react';
import "./styles/ViewDetails.css"

function StudentActivityRecord() {
  const activities = [
    { sno: 1, activity: "MOOCs (SWAYAM/NPTEL/COURSERA or equivalent)", points: { "12 weeks": 20, "8 weeks": 16 }, maxPoints: 40 },
    { sno: 2, activity: "Tech Fest/ R&D Day/ Fresher's Workshop/ Conference", points: { Organizer: 5, Participant: 3 }, maxPoints: 10 },
    { sno: 3, activity: "Rural Reporting", points: { Report: 5 }, maxPoints: 10 },
    { sno: 4, activity: "Harithaharam / Plantation", points: { Participation: 5 }, maxPoints: 10 },
    { sno: 5, activity: "Participation in Relief Camps", points: { Activity: 20 }, maxPoints: 40 },
    { sno: 6, activity: "Participation in Debate/Group Discussion/Technical Quiz", points: { Participation: 10 }, maxPoints: 20 },
    { sno: 7, activity: "Publication in News Paper, Magazines (Institution level)", points: { Editor: 10, Writer: 5 }, maxPoints: 20 },
    { sno: 8, activity: "Publication in News Paper, Magazine & Blogs (National level)", points: { Editor: 10, Writer: 5 }, maxPoints: 20 },
    { sno: 9, activity: "Research Publication (per publication)", points: { Publication: 10 }, maxPoints: 20 },
    { sno: 10, activity: "Innovation Projects (other than course requirements)", points: { Project: 10 }, maxPoints: 20 },
    { sno: 11, activity: "Blood donation/NSS or NCC participation", points: { Participation: 5 }, maxPoints: 10 },
    { sno: 12, activity: "Blood donation/NSS camp organization", points: { Organizer: 5 }, maxPoints: 10 },
    { sno: 13, activity: "Participation in Sports/Games", points: { College: 5, University: 10, Region: 12, State: 15, National: 20 }, maxPoints: 20 },
    { sno: 14, activity: "Cultural Programme (Dance, Drama, Elocution, Music, etc.)", points: { College: 5, University: 10, Region: 12, State: 15, National: 20 }, maxPoints: 20 },
    { sno: 15, activity: "Member of Professional Society", points: { Membership: 5 }, maxPoints: 10 },
    { sno: 16, activity: "Student Chapter/Clubs", points: { Member: 5, Organizer: 10 }, maxPoints: 20 },
    { sno: 17, activity: "Relevant Industry Visit & Report", points: { Visit: 5, Report: 10 }, maxPoints: 20 },
    { sno: 18, activity: "Photography activities in different Clubs (Photography club, Cine club)", points: { Participation: 5 }, maxPoints: 10 },
    { sno: 19, activity: "Participation in Yoga Camp", points: { Participation: 5 }, maxPoints: 10 },
    { sno: 20, activity: "Self-Entrepreneurship Program", points: { Program: 10 }, maxPoints: 20 },
    { sno: 21, activity: "Adventure sports with Certification", points: { Certification: 10 }, maxPoints: 20 },
    { sno: 22, activity: "Training to underprivileged Physically challenged", points: { Training: 10 }, maxPoints: 20 },
    { sno: 23, activity: "Community Service & Allied Activities", points: { Service: 10 }, maxPoints: 20 },
    { sno: 24, activity: "Class Representative", points: { Representative: 5 }, maxPoints: 10 },

  ];

  return (
    <div className="table-container">
      <h3 className='sheet-title'>Activity Points Sheet</h3>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Activity</th>
            <th>Points Earned</th>
            <th>Max Points</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.sno}</td>
              <td>{activity.activity}</td>
              <td>
                {Object.entries(activity.points).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </td>
              <td>{activity.maxPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentActivityRecord;
