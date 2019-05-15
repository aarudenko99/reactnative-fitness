import * as types from "../actionTypes";
import {monthArrary} from "../../utils/monthArray";

//only show data that exist
//labels should be generated automatically

const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const monthToNumberClass = {};

for (let i = 0; i < 12; i++) {
    monthToNumberClass[labels[i]] = i;
}

const defaultState = {
    weightData: [],
    bfrData: [],
};

export const health = (state = defaultState, action) => {
    switch (action.type) {
        case types.UPDATE_WEIGHT_DATA:
            const newWeightData = state.weightData;
            // console.warn(action.payload)
            newWeightData[monthToNumberClass[action.payload.category]] =
                action.payload.item;
            return {...state, weightData: newWeightData};
        case types.UPDATE_BFR_DATA:
            const newBfrData = state.bfrData;
            newBfrData[monthToNumberClass[action.payload.category]] =
                action.payload.item;
            return {...state, bfrData: newBfrData};
        case types.UPDATE_WEIGHT_BFR_FROM_PROGRESS_PICS:
            const newWeightDataX = state.weightData;
            const newBfrDataX = state.bfrData;
            newBfrDataX[action.payload.month] =
                action.payload.BFR;
            newWeightDataX[action.payload.month] =
                action.payload.weight;
            return {...state, bfrData: newBfrDataX, weightData: newWeightDataX};
        default:
            return state;
    }
};
