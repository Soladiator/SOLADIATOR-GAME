export const URL = "/images/main-map.webp";

export interface Area {
  id: number;
  title: string;
  shape: string;
  name: string;
  fillColor: string;
  strokeColor: string;
  coords: number[];
  content?: React.ReactNode;
}

export interface MapType {
  name: string;
  areas: Area[];
}

export const MAP: MapType = {
  name: "burger-map",
  areas: [
    {
      id: 1,
      title: "1",
      shape: "poly",
      name: "1",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        1096, 349, 1113, 352, 1144, 359, 1169, 369, 1186, 377, 1209, 405, 1209,
        427, 1209, 485, 1184, 525, 1139, 543, 1098, 545, 1053, 545, 1013, 543,
        957, 523, 937, 503, 930, 483, 930, 442, 932, 410, 955, 384, 985, 367,
        1020, 357, 1063, 352,
      ],
      content: "Arena",
    },
    {
      id: 2,
      title: "2",
      shape: "poly",
      name: "2",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        889, 795, 990, 744, 988, 644, 993, 634, 804, 538, 791, 543, 743, 616,
        754, 628, 751, 664, 754, 706, 746, 719, 754, 727, 754, 764, 733, 782,
        779, 812, 804, 790, 819, 797, 847, 774,
      ],
      content: "Some content for the second area",
    },
    {
      id: 3,
      title: "3",
      shape: "poly",
      name: "3",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        492, 558, 492, 475, 499, 462, 462, 400, 424, 407, 379, 430, 379, 387,
        363, 382, 346, 389, 348, 442, 316, 462, 283, 480, 290, 488, 290, 515,
        293, 543, 278, 556, 288, 563, 290, 598, 358, 628, 439, 586, 472, 568,
      ],
    },
    {
      id: 4,
      title: "4",
      shape: "poly",
      name: "4",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        1330, 916, 1345, 901, 1365, 909, 1451, 861, 1448, 806, 1453, 798, 1413,
        733, 1370, 740, 1277, 791, 1282, 796, 1280, 831, 1267, 846, 1275, 858,
        1267, 884,
      ],
    },
    {
      id: 5,
      title: "5",
      shape: "poly",
      name: "5",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        952, 327, 966, 344, 1009, 324, 987, 294, 1014, 279, 1014, 186, 873, 118,
        826, 98, 778, 171, 785, 173, 785, 196, 765, 191, 722, 244, 732, 251,
        732, 276, 715, 289, 712, 311, 737, 327, 760, 324, 768, 337, 801, 352,
        814, 337, 824, 342, 824, 342, 837, 349, 859, 357, 884, 339, 884, 311,
        900, 319, 920, 327, 945, 314,
      ],
    },
  ],
};
