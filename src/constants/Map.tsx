import MonstersModal from "@/components/Fight/monsters-modal";
import BlacksmithDrag from "@/components/Merchants/Blacksmith/inventory-drag";
import InventoryDrag from "@/components/stats/inventory-drag";

export const URL = "/images/main-map.webp";


export interface Area {
  id: number;
  title: string;
  shape: string;
  name: string;
  fillColor: string;
  strokeColor: string;
  coords: number[];
  labelPercentages: [number, number];
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
      title: "Auction House",
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
      labelPercentages: [50, 11],
      content: "arena"
    },
    {
      id: 2,
      title: "Player's House",
      shape: "poly",
      name: "Player's House",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        889, 795, 990, 744, 988, 644, 993, 634, 804, 538, 791, 543, 743, 616,
        754, 628, 751, 664, 754, 706, 746, 719, 754, 727, 754, 764, 733, 782,
        779, 812, 804, 790, 819, 797, 847, 774,
      ],
      labelPercentages: [49, 56],
      content: <InventoryDrag/>
    },
    {
      id: 3,
      title: "Arena",
      shape: "poly",
      name: "Arena",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        492, 558, 492, 475, 499, 462, 462, 400, 424, 407, 379, 430, 379, 387,
        363, 382, 346, 389, 348, 442, 316, 462, 283, 480, 290, 488, 290, 515,
        293, 543, 278, 556, 288, 563, 290, 598, 358, 628, 439, 586, 472, 568,
      ],
      labelPercentages: [60, 40],
    },
    {
      id: 4,
      title: "Armorsmith",
      shape: "poly",
      name: "Armorsmith",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        1330, 916, 1345, 901, 1365, 909, 1451, 861, 1448, 806, 1453, 798, 1413,
        733, 1370, 740, 1277, 791, 1282, 796, 1280, 831, 1267, 846, 1275, 858,
        1267, 884,
      ],
      labelPercentages: [76, 72],
    },
    {
      id: 5,
      title: "Herbalist",
      shape: "poly",
      name: "Herbalist",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        952, 327, 966, 344, 1009, 324, 987, 294, 1014, 279, 1014, 186, 873, 118,
        826, 98, 778, 171, 785, 173, 785, 196, 765, 191, 722, 244, 732, 251,
        732, 276, 715, 289, 712, 311, 737, 327, 760, 324, 768, 337, 801, 352,
        814, 337, 824, 342, 824, 342, 837, 349, 859, 357, 884, 339, 884, 311,
        900, 319, 920, 327, 945, 314,
      ],
      labelPercentages: [23, 40],
    },
    {
      id: 6,
      title: "Blacksmith",
      shape: "poly",
      name: "Blacksmith",
      fillColor: "rgba(216, 152, 83, 0.35)",
      strokeColor: "#D89853",
      coords: [
        1418, 666, 1415, 618, 1415, 596, 1421, 593, 1383, 573, 1385, 523, 1370,
        518, 1353, 523, 1353, 553, 1275, 515, 1259, 522, 1262, 530, 1249, 547,
        1227, 578, 1239, 588, 1242, 610, 1214, 595, 1184, 605, 1181, 643, 1307,
        701, 1330, 683, 1350, 698, 1375, 686,
      ],
      labelPercentages: [73, 51],
      content: <BlacksmithDrag/>
    },
    {
      id: 7,
      title: "Dark Forest",
      shape: "poly",
      name: "Dark Forest",
      fillColor: "rgba(0,0,0,0.2)",
      strokeColor: "transparent",
      coords: [
        -2, -3, 942, 0, 945, 70, 915, 86, 900, 78, 887, 86, 892, 98, 867, 106,
        822, 98, 806, 123, 791, 143, 779, 146, 764, 146, 761, 161, 721, 181,
        693, 176, 688, 196, 665, 204, 655, 189, 623, 201, 613, 194, 605, 194,
        605, 209, 577, 221, 570, 209, 552, 216, 557, 229, 532, 244, 522, 231,
        504, 237, 507, 257, 479, 269, 472, 257, 457, 264, 459, 279, 434, 289,
        424, 274, 409, 284, 409, 302, 368, 317, 356, 307, 343, 317, 343, 330,
        295, 352, 283, 345, 268, 352, 273, 362, 238, 380, 230, 370, 215, 380,
        215, 392, 202, 400, 187, 395, 155, 408, 155, 420, 137, 430, 124, 420,
        112, 428, 114, 440, 92, 450, 82, 443, 66, 448, 71, 460, 1, 491, -2, 455,
        1, 405, 1, 204, 1, 86, 1, 38,
      ],
      labelPercentages: [18, 18],
      content: <MonstersModal/>
    },
  ],
};
