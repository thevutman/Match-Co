import{ Dimension} from "react-native";

const{width: deviceWidth, height: deviceHeight} = Dimension.get('window');

const hp = porcentage => {
    return (percentage*deviceHeight) /100;
}
export const wp = porcentage => {
    return (percentage*deviceWidth) /100;
}