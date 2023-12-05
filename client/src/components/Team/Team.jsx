import React from "react";
import Member from "./Member";
import TeamData from "../../Data/team.json";

// icones prises de https://www.flaticon.com/

export const Team = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-semibold mb-4">Notre équipe</h1>
      <div className="flex flex-wrap justify-center">
        {TeamData.team.map((member, index) => (
          <div key={index} className="w-1/4 p-4">
            <Member name={member.name} image={member.image_src} role={member.role} />
          </div>
        ))}
      </div>
  </div>
  );
};

export default Team;
