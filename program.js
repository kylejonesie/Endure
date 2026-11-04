// Endure training program data.
//
// LIBRARY is the permanent list of exercises. It only ever grows.
// BLOCKS are selections from the library. Nothing carries over between blocks:
// to start a new block, add an entry to BLOCKS and reference library ids.
// To use a new exercise, add it to LIBRARY first.

const TOP_SET_FIELDS = [
  {k:"level", label:"Variation"},
  {k:"load",  label:"Load"},
  {k:"reps",  label:"Reps", inputmode:"numeric"},
  {k:"left",  label:"Reps left", inputmode:"numeric"},
];
const PAIN_FIELD = {k:"pain", label:"Calf pain (0–10)", inputmode:"numeric"};
const MODE_FIELD = {k:"mode", label:"Mode", type:"select", opts:["Run","Bike"]};
const TOP_SET_HOW = "Warm up first. Do 1 set of 3 reps through full range, stopping just short of failure. If all 3 stay clean with about 1 rep left, make it slightly harder next session. If range or control drops, keep this level next week.";
const PAIN_RULE = "0–2: progress as planned. 3–4: repeat this session next time. 5+ or swelling: stop running, use the bike until it settles, and check with your PT.";

const LIBRARY = {
  // Warm-ups
  "warmup-upper":    {n:"Warm Up: Walk or Easy Bike + Wrists & Shoulders", tags:["warmup"], t:"check"},
  "warmup-lower":    {n:"Warm Up: Walk or Easy Bike + Hips & Ankles", tags:["warmup"], t:"check"},
  "warmup-pull":     {n:"Pull warm-up sets", tags:["warmup","pull"], t:"check"},
  "warmup-push":     {n:"Push warm-up sets", tags:["warmup","push"], t:"check"},
  "warmup-legs":     {n:"Squat and hinge warm-up sets", tags:["warmup","squat","hinge"], t:"check"},
  "wrist-prep":      {n:"Wrist Prep", tags:["warmup"], t:"check"},
  "shoulder-cars":   {n:"Shoulder CARs / Band Work", tags:["warmup","mobility"], t:"check"},
  "scapular-pullup": {n:"Scapular Pull-ups", tags:["warmup","pull"], t:"check"},
  "run-walk":        {n:"Run/Walk", tags:["warmup","cardio"], t:"check"},
  "deep-squat":      {n:"Deep Squat", tags:["warmup","mobility"], t:"check"},
  "cossack-squat":   {n:"Cossack Squat", tags:["warmup","mobility"], t:"check"},

  // Calf PT
  "calf-check":     {n:"Calf/Achilles morning check", tags:["pt"], t:"fields", fields:[{k:"pain", label:"Pain (0–10)", inputmode:"numeric"}], how:PAIN_RULE},
  "tripod-calf":    {n:"Calf PT: Tripod Calf Stretch", tags:["pt"], t:"check"},
  "heel-raise":     {n:"Calf PT: Heel Raise on Step", tags:["pt"], t:"check"},
  "seated-calf":    {n:"Calf PT: Seated Calf Raise w/ Weights", tags:["pt"], t:"check"},
  "triple-ext":     {n:"Calf PT: Standing Triple Extension", tags:["pt"], t:"check"},

  // Six movements
  "weighted-pullup": {n:"Weighted pull-up", tags:["pull","strength"], t:"fields", fields:TOP_SET_FIELDS, how:TOP_SET_HOW, start:{level:"Full range", load:"+10 lb"}},
  "ring-row":        {n:"Feet-elevated ring row", tags:["pull","strength"], t:"fields", fields:TOP_SET_FIELDS, how:TOP_SET_HOW, start:{level:"Feet elevated", load:"BW"}},
  "pike-pushup":     {n:"Feet-elevated pike push-up", tags:["push","strength"], t:"fields", fields:TOP_SET_FIELDS, how:TOP_SET_HOW, start:{level:"Feet elevated", load:"BW"}},
  "ring-pushup":     {n:"Feet-elevated ring push-up", tags:["push","strength"], t:"fields", fields:TOP_SET_FIELDS, how:TOP_SET_HOW, start:{level:"Feet elevated", load:"BW"}},
  "pistol-left":     {n:"Pistol squat — LEFT", tags:["squat","strength"], t:"fields", fields:TOP_SET_FIELDS, how:TOP_SET_HOW, start:{level:"Assisted", load:"BW"}},
  "pistol-right":    {n:"Pistol squat — RIGHT", tags:["squat","strength"], t:"fields", fields:TOP_SET_FIELDS, how:TOP_SET_HOW, start:{level:"Assisted", load:"BW"}},
  "rdl":             {n:"Romanian deadlift", tags:["hinge","strength"], t:"fields", fields:TOP_SET_FIELDS, how:TOP_SET_HOW, start:{level:"Barbell", load:"75 lb"}},
  "dead-hang":       {n:"Dead hang", tags:["pull","fingers"], t:"check"},
  "sl-glute-bridge": {n:"Single-leg glute bridge", tags:["hinge"], t:"sets", ds:3, dr:"8", dw:"BW"},

  // Skills and mobility
  "handstand":       {n:"Handstand", tags:["skill"], t:"fields", fields:[{k:"holds", label:"Best hold (sec)", inputmode:"numeric"}], how:"Short wall-facing holds. Stop before form slips."},
  "pancake":         {n:"Pancake", tags:["skill","mobility"], t:"check", how:"Relaxed holds, after strength work."},
  "shoulder-dislocates": {n:"Shoulder dislocates", tags:["mobility"], t:"check"},
  "nerve-floss":     {n:"Nerve floss (pain-free)", tags:["mobility"], t:"check"},

  // Core
  "l-sit":           {n:"L-sit", tags:["core","skill"], t:"fields", fields:[{k:"holds", label:"Best hold (sec)", inputmode:"numeric"}]},
  "hanging-leg-lift":{n:"Hanging Bent Knee Leg Lifts", tags:["core"], t:"sets", ds:2, dr:"6", dw:"BW"},
  "round-the-world": {n:"Round the Worlds", tags:["core"], t:"sets", ds:3, dr:"5", dw:"25 lb"},
  "russian-twist":   {n:"Russian twists", tags:["core"], t:"sets", ds:3, dr:"10", dw:"20 lb"},

  // Fingers
  "abrahangs": {n:"Abrahangs", tags:["fingers"], t:"fields",
    fields:[{k:"hangs", label:"Hangs done", inputmode:"numeric"}, {k:"pain", label:"Finger pain (0–10)", inputmode:"numeric"}],
    how:"18–22 mm edge with both feet on the floor. 10 sec on, 20 sec off. Load to a light forearm strain, about 40% of max. Do not add load. Stop a grip if a finger hurts. Finish at least 6 hours before climbing."},
  "repeaters": {n:"Repeaters", tags:["fingers"], t:"fields",
    fields:[{k:"sets", label:"Sets done", inputmode:"numeric"}, {k:"assist", label:"Foot assist / load"}],
    how:"After easy warm-up routes. 20 mm edge, half crimp, feet assisting as needed. 10 sec on, 5 sec off, six times per set. Rest 3 minutes between sets. The last hang should feel hard but controlled."},

  // Cardio
  "norwegian-4x4": {n:"4x4 intervals", tags:["cardio","hiit"], t:"fields",
    fields:[MODE_FIELD, {k:"done", label:"Intervals done", inputmode:"numeric"}, {k:"rpe", label:"Peak RPE", inputmode:"decimal"}, {k:"hr", label:"Peak HR", inputmode:"numeric"}, PAIN_FIELD],
    defaults:{mode:"Run"},
    how:"Warm up 10 min. Run on flat ground. Walk or jog 3 min between efforts. Cool down 5–10 min. "+PAIN_RULE},
  "zone2": {n:"Zone 2", tags:["cardio","zone2"], t:"fields",
    fields:[MODE_FIELD, {k:"time", label:"Duration"}, {k:"hr", label:"Avg HR", inputmode:"numeric"}, {k:"dist", label:"Distance"}, {k:"elev", label:"Elevation (ft)", inputmode:"numeric"}, PAIN_FIELD],
    how:"Conversational pace, even on hills. "+PAIN_RULE},
  "easy-bike": {n:"Easy bike", tags:["cardio","zone2"], t:"fields",
    fields:[{k:"time", label:"Duration"}, {k:"hr", label:"Avg HR", inputmode:"numeric"}],
    how:"Finish at least 24 hours before Friday's gym session."},
  "group-ride": {n:"Group ride", tags:["cardio"], t:"note"},

  // Climbing
  "arc": {n:"ARC or easy laps", tags:["climb","endurance"], t:"fields",
    fields:[{k:"format", label:"Format", type:"select", opts:["ARC","Easy laps"]}, {k:"time", label:"Time climbing"}, {k:"grade", label:"Grades"}],
    how:"Continuous climbing with a mild pump you can shake out. Stop before technique gets sloppy."},
  "hard-moves": {n:"Hard individual moves", tags:["climb","power"], t:"check"},
  "route-intervals": {n:"Route intervals", tags:["climb","endurance"], t:"fields",
    fields:[{k:"rounds", label:"Rounds done", inputmode:"numeric"}, {k:"grade", label:"Grades"}],
    how:"Climb equal work and rest intervals."},
  "boulder-circuits": {n:"Linked boulders", tags:["climb","power-endurance"], t:"fields",
    fields:[{k:"rounds", label:"Rounds done", inputmode:"numeric"}, {k:"grade", label:"Grades"}],
    how:"Warm up, then four linked problems back to back. Rest fully, then repeat."},
  "climb-benchmark": {n:"Endurance benchmark", tags:["climb","test"], t:"fields",
    fields:[{k:"route", label:"Route or circuit"}, {k:"laps", label:"Clean laps", inputmode:"numeric"}],
    how:"Use the same sustained 5.10 route or circuit in weeks 1 and 11."},
  "outdoor-pitches": {n:"Pitches", tags:["climb","outdoor"], t:"rows",
    columns:[
      {k:"grade", label:"Grade"},
      {k:"pitches", label:"Pitches", inputmode:"numeric"},
      {k:"felt", label:"How it felt"},
      {k:"limiter", label:"Limiter", type:"select", opts:["Pump","Crux","Head game"]},
    ],
    how:"Climb what looks fun. Log it, but do not train it."},
};

// ── BLOCK 2 ──────────────────────────────────────────────────────────────────
const inWeeks = (...weeks) => week => weeks.includes(week);
const lightWeek = week => [4, 8, 12].includes(week);

const block2Tables = {
  // [intervals, RPE]
  hiit: {1:"3 × 3 min, RPE 7", 2:"3 × 4 min, RPE 7", 3:"3 × 4 min, RPE 8", 4:"2 × 4 min, RPE 6",
         5:"4 × 3 min, RPE 8", 6:"4 × 4 min, RPE 7–8", 7:"4 × 4 min, RPE 8", 8:"3 × 3 min, RPE 7",
         9:"4 × 4 min, RPE 8", 10:"4 × 4 min, RPE 8–9", 11:"4 × 4 min, RPE 8–9", 12:"2 × 4 min, RPE 6"},
  arc: {1:"2 × 15 min", 2:"2 × 20 min", 3:"3 × 15 min", 4:"2 × 15 min", 5:"3 × 20 min", 6:"3 × 20 min",
        7:"3 × 25 min", 8:"2 × 15 min", 9:"3 × 20 min", 10:"3 × 20 min", 11:"3 × 20 min", 12:"2 × 15 min"},
  repeaters: {5:"2 sets", 6:"3 sets", 7:"3 sets", 9:"3 sets", 10:"3 sets", 11:"3 sets"},
  intervals: {1:"4 × 4 min on/off", 2:"4 × 4 min on/off", 3:"5 × 4 min on/off", 4:"3 × 4 min on/off",
              5:"4 × 5 min on/off", 6:"4 × 5 min on/off", 7:"5 × 5 min on/off", 8:"3 × 4 min on/off",
              12:"3 × 4 min on/off"},
  boulders: {9:"3 rounds of 4", 10:"4 rounds of 4", 11:"4 rounds of 4"},
  bikeLadder: ["2:00","2:10","2:20","2:30","2:40","2:50","3:00","3:10","3:20"],
  runLadder: [30,33,36,39,42,46,50,54,58],
  lightBike: {4:"1:40", 8:"2:00", 12:"2:00"},
  lightRun: {4:30, 8:36, 12:40},
};

const intervalGrades = week => week >= 5 && week <= 8 ? "5.10c–5.11a" : "5.10a–5.10c";
const topSet = week => lightWeek(week) ? "1 × 3, ~2 left" : week === 1 ? "1 × 3, ~2 left" : "1 × 3, ~1 left";
const CALF_PT = [
  {id:"calf-check"},
  {id:"tripod-calf", tgt:"2 × 15"},
  {id:"heel-raise",  tgt:"3 × 20"},
  {id:"seated-calf", tgt:"3 × 12 / 25 lb"},
  {id:"triple-ext",  tgt:"3 × 5"},
];
const ABRAHANGS = {
  key:"abrahangs", name:"Abrahangs", tag:"fingers",
  dur:week => week <= 2 ? "6 min" : "10 min",
  items:[{id:"abrahangs",
    tgt:week => week <= 2 ? "12 hangs" : "20 hangs",
    how:week => "Four-finger half crimp × 6, front three open × 6" + (week <= 2 ? "." : ", then × 2 each: front two open, middle two open, front two half crimp, middle two half crimp.")}],
};

const BLOCK_2 = {
  id:"block-2",
  name:"Block 2 · Climbing Endurance",
  start:"2026-11-02",
  end:"2027-01-24",
  lightWeeks:[4, 8, 12],
  days:{
    1:[
      {key:"gym-pull", name:"Gym — Pull", tag:"strength", dur:"≤ 60 min", items:[
        {id:"warmup-upper", tgt:"5 min"}, ...CALF_PT,
        {id:"handstand", tgt:"8 min"},
        {id:"warmup-pull", tgt:"2–4 easy sets"},
        {id:"weighted-pullup", tgt:topSet},
        {id:"ring-row", tgt:topSet},
        {id:"l-sit", tgt:"3–4 × 5–10 sec"},
        {id:"pancake", tgt:"2–3 × 30–60 sec"},
      ]},
      {key:"climb-arc", name:"Climbing — Aerobic", tag:"climb", dur:"60–90 min", items:[
        {id:"climb-benchmark", when:inWeeks(11), tgt:"Fresh attempt"},
        {id:"repeaters", when:week => !!block2Tables.repeaters[week], tgt:week => block2Tables.repeaters[week]},
        {id:"arc", tgt:week => block2Tables.arc[week] + ", 5.9–5.10a"},
      ]},
    ],
    2:[
      ABRAHANGS,
      {key:"hiit", name:"4x4 Intervals", tag:"cardio", dur:"35–45 min", items:[
        {id:"norwegian-4x4", tgt:week => block2Tables.hiit[week]},
      ]},
    ],
    3:[
      ABRAHANGS,
      {key:"gym-push", name:"Gym — Push", tag:"strength", dur:"≤ 60 min", items:[
        {id:"warmup-upper", tgt:"5 min"}, ...CALF_PT,
        {id:"warmup-push", tgt:"2–4 easy sets"},
        {id:"pike-pushup", tgt:topSet},
        {id:"ring-pushup", tgt:topSet},
        {id:"l-sit", tgt:"3–4 × 5–10 sec"},
        {id:"pancake", tgt:"2–3 × 30–60 sec"},
      ]},
      {key:"easy-bike", name:"Easy Bike", tag:"cardio", dur:"40–45 min", optional:true, items:[
        {id:"easy-bike", tgt:"40–45 min"},
      ]},
    ],
    4:[
      ABRAHANGS,
      {key:"climb-intervals", name:week => block2Tables.boulders[week] ? "Climbing — Power Endurance" : "Climbing — Route Intervals", tag:"climb", dur:"75–90 min", items:[
        {id:"climb-benchmark", when:inWeeks(1), tgt:"Before intervals"},
        {id:"hard-moves", when:week => week <= 8, tgt:"10 min"},
        {id:"route-intervals", when:week => !!block2Tables.intervals[week], tgt:week => block2Tables.intervals[week] + ", " + intervalGrades(week)},
        {id:"boulder-circuits", when:week => !!block2Tables.boulders[week], tgt:week => block2Tables.boulders[week] + ", 2–3 grades below max"},
      ]},
    ],
    5:[
      ABRAHANGS,
      {key:"gym-legs", name:"Gym — Legs", tag:"strength", dur:"≤ 60 min", items:[
        {id:"warmup-lower", tgt:"5 min"}, ...CALF_PT,
        {id:"handstand", tgt:"8 min"},
        {id:"warmup-legs", tgt:"2–4 easy sets"},
        {id:"pistol-left", tgt:topSet},
        {id:"pistol-right", tgt:topSet},
        {id:"rdl", tgt:topSet},
        {id:"hanging-leg-lift", tgt:"2 × 6–8, well short of failure"},
      ]},
    ],
    6:[
      {key:"outdoor", name:"Outdoor Climbing", tag:"climb", dur:"Your call", items:[
        {id:"outdoor-pitches"},
      ]},
    ],
    0:[
      ABRAHANGS,
      {key:"long-z2", name:"Long Zone 2", tag:"cardio",
        dur:(week, ctx) => zone2Target(ctx), items:[{id:"zone2", tgt:(week, ctx) => zone2Target(ctx)}]},
    ],
  },
};

// Each sport climbs its own ladder, one rung per completed normal-week session.
function zone2Target(ctx){
  const {bikeLadder, runLadder, lightBike, lightRun} = block2Tables;
  const rung = (ladder, count) => ladder[Math.min(count, ladder.length - 1)];
  const bikeCount = ctx.completed("long-z2", "mode", "Bike");
  const runCount = ctx.completed("long-z2", "mode", "Run");
  let bike = rung(bikeLadder, bikeCount);
  let run = rung(runLadder, runCount);
  if(lightBike[ctx.week]){
    bike = minutes(lightBike[ctx.week]) < minutes(bike) ? lightBike[ctx.week] : bike;
    run = Math.min(lightRun[ctx.week], run);
  }
  return `Bike ${bike} / Run ${run} min`;
}
function minutes(clock){ const [h, m] = clock.split(":").map(Number); return h * 60 + m; }

const BLOCKS = [BLOCK_2];
