let colors = {};

colors.primary =  {
    green: "#204650",
    orange: "#E54600"
}

colors.secondary =  {
    green: "#2CE48C",
    yellow: "#FFBE3F",
    brown: "#B4632B",
    pink: "#FFBFB1",
    yellowLight: "#FFEAB5",
    greenLight: "#D7E1C9",
}

colors.secondaries =  [
    "#FA5F08",
    "#0098BA",
    "#93A0BC",
    "#A14A0D",
    "#DC056C",
    "#0FBC69",
    "#FAAB13",
    "#81B13D",
]

colors.accent =  {
    green: "#E5FFF3",
    yellow: "#FDF4E3",
    brown: "#FFF1E7",
    pink: "#FFEBE7",
    blue: "#E5F9FF",
    yellowLight: "#FEFAF1",
    greenLight: "#F1F4EB",
    greenYellow: "#EEFFE5"
}

colors.accents =  [
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
    "#E5FFF3",
    "#FDF4E3",
    "#FFF1E7",
    "#FFEBE7",
    "#FEFAF1",
    "#F1F4EB",
]

colors.neutral =  {
    black: "#202225",
    grey: "#434A58",
    greyLight: {
        one: "#93A0BC",
        two: "#B9C5E0",
        three: "#F8FAFF"
    },
    white: "#FFFFFF"
}

colors.neutrals =  [
    "#202225",
    "#434A58",
    "#93A0BC",
    "#B9C5E0",
    "#F8FAFF",
    "#FFFFFF"
]

colors.randomize = (max) => {
    return Math.floor(Math.random() * max);
}

colors.randomBgAccents = () => {
    const color = colors.accents[colors.randomize(50)];
    return color;
}

export default colors;