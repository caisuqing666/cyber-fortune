// 类型定义
export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

// 页面状态类型
export type PageState = "entry" | "question" | "loading" | "result" | "share" | "exit";

// 结果数据类型
export interface ResultData {
  type: ResultType;
  judgement: string;
  scene: string;
  comfort: string;
  tag: string;
}

// 问题数据
export const questions: Question[] = [
  {
    id: 1,
    question: "早上闹钟响的那一刻，你脑子里在想什么？",
    options: [
      { text: "新的一天，勉强能处", score: 0 },
      { text: "睡了，但又好像没睡", score: 1 },
      { text: "我刚闭眼怎么就天亮了", score: 2 },
    ],
  },
  {
    id: 2,
    question: "最近干活是什么状态？",
    options: [
      { text: "在做事，偶尔还能被夸", score: 0 },
      { text: "很忙，但不知道忙了个啥", score: 1 },
      { text: "使劲了，但没激起一点水花", score: 2 },
    ],
  },
  {
    id: 3,
    question: "一句话形容现在的你？",
    options: [
      { text: "能卷，但不想卷了", score: 0 },
      { text: "表面稳住，内心疯狂", score: 1 },
      { text: "电量1%，信号也没了", score: 2 },
    ],
  },
];

// 结果类型定义
export type ResultType = "hidden_drain" | "recovery" | "transition";

// 根据分数获取结果类型
export function getResultType(score: number): ResultType {
  if (score <= 2) return "hidden_drain";
  if (score <= 4) return "recovery";
  return "transition";
}

// 判词库
export const fortuneData = {
  hidden_drain: {
    name: "赛博牛马",
    coreVibe: "表面营业，内核已关机",
    scoreRange: "0-2",
    judgements: [
      "班味入骨",
      "精神已读不回",
      "灵魂请假中",
      "活着但仅限于呼吸",
      "人形省电模式",
      "职业假装正常",
      "营业中（心除外）",
    ],
    scenes: [
      "每天醒来第一件事：算还有几天到周末。",
      "别人问「最近咋样」，你说「还行」，心里在放哀乐。",
      "上班摸鱼觉得愧疚，认真干又觉得亏。",
      "努力了，但努力到忘了为什么要努力。",
      "开会的时候人在，魂已经飘到三里屯了。",
      "下班回家也不想动，躺着又觉得自己废。",
      "你不是不想努力，你是连努力的力气都没了。",
      "表面在工位敲键盘，实际在脑内写辞职信。",
      "唯一的运动是：在床上翻身。",
      "你以为自己在休息，其实只是换了个地方累。",
    ],
    comforts: [
      "不是你菜，是这游戏难度有bug。",
      "你不是懒，是在极限节能。",
      "累了就是累了，不用惨到一定程度才配休息。",
      "你已经很努力了，只是没人看见而已。",
      "先活着，牛逼的事以后再说。",
    ],
    tags: [
      "当代赛博牛马",
      "精神状态：已读不回",
      "带薪发呆中",
      "今日营业额：0",
      "人在工位心在床",
    ],
  },
  recovery: {
    name: "低谷爬坡型选手",
    coreVibe: "躺够了，准备翻身",
    scoreRange: "3-4",
    judgements: [
      "摆烂后遗症",
      "低谷VIP即将到期",
      "系统重启中",
      "开始看不惯躺平的自己",
      "想卷但还差一口气",
      "灵魂正在重连",
      "缓慢复健中",
    ],
    scenes: [
      "躺着觉得废，坐起来又不知道干嘛。",
      "开始翻以前立的flag，虽然大概率又打脸。",
      "好消息：不想emo了。坏消息：也不知道想干嘛。",
      "已经能下床走两步了，进步。",
      "看到别人努力，开始有点不甘心了。",
      "你不是满血复活，但至少回了口血。",
      "偶尔会想「要不我也试试」，三秒后打消念头。",
      "你不是没动力，是动力正在配送中。",
      "已经从「彻底摆烂」升级到「间歇性想努力」了。",
      "卡在「要不算了」和「再试一次」之间反复横跳。",
    ],
    comforts: [
      "从1%充到30%也是进步，别急着100%，会爆。",
      "能嫌弃自己了，说明系统在自动修复。",
      "好起来像心电图，有起伏才正常。",
      "你已经比昨天那个废物强了，这就是进步。",
      "慢慢来，反正快也快不到哪去。",
    ],
    tags: [
      "谷底待久了想爬坡",
      "emo会员即将过期",
      "低配版重新做人",
      "摆烂结束，开始装忙",
      "状态回血中",
    ],
  },
  transition: {
    name: "版本更新中",
    coreVibe: "旧的删了，新的在下载",
    scoreRange: "5-6",
    judgements: [
      "人生切换服务器中",
      "旧版本已停服",
      "新档还没建好",
      "好事发生前的混乱期",
      "正在从将就升级到讲究",
      "过渡期阵痛选手",
      "剧本正在重写",
    ],
    scenes: [
      "旧的看不上，新的还没来，卡在中间像网卡。",
      "你对「凑合」开始过敏了。",
      "回不去旧版本了，但新版本还没装好。",
      "最近脾气变大了，因为忍耐阈值在降低。",
      "以前能忍的，现在一点就炸。",
      "你不是矫情，是终于不想委屈自己了。",
      "所有的烦躁都在说一件事：你已经不满足于现状了。",
      "选择变多了，反而更纠结了——这是好事。",
      "你不是迷茫，是选项终于比以前多了。",
      "混乱是正常的，蛹变蝴蝶之前也是一坨。",
    ],
    comforts: [
      "乱是对的，你在从「能忍」升级到「不忍」。",
      "破旧才能立新，现在疼是正常的。",
      "烦躁说明你眼光变高了，要求变多了。",
      "旧的不去新的不来，你正在「去旧」。",
      "你快熬出头了，别在黎明前放弃。",
    ],
    tags: [
      "人生2.0加载中",
      "旧版卸载中勿断电",
      "好事将近前的混乱",
      "此时退出将丢失进度",
      "阵痛期选手",
    ],
  },
};

// 加载页文案
export const loadingTexts = [
  { progress: 0, text: "正在扫描精神状态..." },
  { progress: 25, text: "排除「你太矫情」的可能性..." },
  { progress: 60, text: "确认了，是生活的问题" },
  { progress: 100, text: "诊断完成" },
];

// 随机选择函数
export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
