import React from 'react';
import Circularbar from "@/app/components/Circularbar";

const ScoreBar = ({ score, avgscore, label }) => {
  const score_percentage = (score / 250) * 100;
  const avgscore_percentage = (avgscore / 250) * 100;
  let barColor = 'bg-red-500';
  let avgbarColor = 'bg-red-500';


  if (score_percentage >= 75) {
    barColor = 'bg-green-500';
  } else if (score_percentage >= 50) {
    barColor = 'bg-orange-500';
  }

  if (avgscore_percentage >= 75) {
    avgbarColor = 'bg-green-500';
  } else if (avgscore_percentage >= 50) {
    avgbarColor = 'bg-orange-500';
  }

  const scorePosition = `${score_percentage-5}%`;
  const avgscorePosition = `${avgscore_percentage-5}%`;

  return (
    <div className="mb-4 grid grid-cols-2 gap-3 ">
      <div className="grid grid-cols-1 justify-between mb-1 ">
        <span className="text-slate-800 w-full block font-regular text-lg relative top-10 left-5">{label}</span>
        <span className="text-slate-400 w-full block font-regular text-lg relative top-5 left-5">VisitorReach Church Average</span>
      </div>
      
      <div className='grid grid-cols-1 gap-3  w-full'>
        <div className=''>
          <span
              className="text-black relative "
              style={{ left: scorePosition}}
            >
              {score}
          </span>
          
          <div className='grid place-items-center mb-4  h-10 m-auto'>
            
            <div className="h-4 bg-gray-300 rounded-full w-full overflow-hidden relative ">
              <div
                className={`h-full rounded-l-full ${barColor}  mb-5`}
                style={{ width: `${score_percentage}%` }}
              >
              
              </div>
              
            </div>
            {/* <div className='absolute h-8 w-8 align-self-center rounded-full bg-zinc-200 shadow-lg' ></div>
            <div className='absolute h-6 w-6 align-self-center rounded-full bg-slate-900 shadow-sm' ></div> */}
        </div>
        </div>
      
        <div className=''>
          <span
              className="text-black relative "
              style={{ left: avgscorePosition}}
            >
              {score}
          </span>
          
          <div className='grid place-items-center mb-4 border-2 border-blue-700 h-10 m-auto'>
            
            <div className="h-4 bg-gray-300 rounded-full w-full overflow-hidden relative ">
              <div
                className={`h-full rounded-l-full ${avgbarColor}  mb-5`}
                style={{ width: `${avgscore_percentage}%` }}
              >
              
              </div>
              
            </div>
            {/* <div className='absolute h-8 w-8 align-self-center rounded-full bg-zinc-200 shadow-lg' ></div>
            <div className='absolute h-6 w-6 align-self-center rounded-full bg-slate-900 shadow-sm' ></div> */}
        </div>
        </div>
        
        
        
      </div>
      
    </div>
  );
};

const ScoreSummary = ({
  digitalVoiceScore,
  digitalMapsScore,
  socialClarityScore,
  websiteAuthorityScore,
  avgDigitalVoiceScore,
  avgDigitalMapsScore,
  avgSocialClarityScore,
  avgWebsiteAuthorityScore,

}) => {
  return (
    <div className='grid grid-cols-2 bg-white rounded-3xl '>
      <div>
        <h2 className="text-2xl mb-4 text-black font-medium">
          Digital Health Score Summary
        </h2>
        <div className=''>
          <div className='w-11/12 h-11/12'>
            <ScoreBar
              score={digitalVoiceScore}
              avgScore={avgDigitalVoiceScore}
              label="Digital Voice Score"
            />
            <ScoreBar
              score={digitalMapsScore}
              avgScore={avgDigitalMapsScore}
              label="Digital Maps Score"
            />
            <ScoreBar
              score={socialClarityScore}
              avgScore={avgSocialClarityScore}
              label="Social Clarity Score"
            />
            <ScoreBar
              score={websiteAuthorityScore}
              avgScore={avgWebsiteAuthorityScore}
              label="Website Authority Score"
            />
          </div>
          
            
        </div>
        
      </div>
      <div>
        <h1 className='text-black text-xl relative top-4'>
          Your Church’s Total Digital Health Score
        </h1>
        <Circularbar value={digitalVoiceScore + digitalMapsScore + socialClarityScore +websiteAuthorityScore} title={""} max_value={1000}/>
      </div>
    </div>
  );
};

export default ScoreSummary;