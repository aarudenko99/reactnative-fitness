import {
    Button,
    Modal,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
} from "react-native";
import React, {Component} from "react";

const {width, height} = Dimensions.get("window");

export class EditWeightReps extends Component {
    constructor(props) {
        super(props);
        state = {
            weightText: {},
            repsText: {},
            top: height * 0.3,
            blur: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.warn("should");
        const length = this.props.weightRepsDataArr.length;
        if (this.state.blur && nextState !== this.state) {
            console.warn("in");
            // for (let i = 0; i < length; i++) {
            //     this.setState({
            //         [`weightText${i}`]: nextState[`weightText${i}`]
            //     })
            // }
            // this.setState({weightText: nextState.weightText});
            return true;
        }
        return false;
    }

    componentWillMount() {
        const weightTextTmp = {};
        const repsTextTmp = {};
        for (let i = 0; i < this.props.weightRepsDataArr.length; i++) {
            weightTextTmp[i] = this.props.weightRepsDataArr[i] ? this.props.weightRepsDataArr[i].weight : 0;
            repsTextTmp[i] = this.props.weightRepsDataArr[i] ? this.props.weightRepsDataArr[i].reps : 0;
        }
        this.setState({
            weightText: weightTextTmp,
            repsText: repsTextTmp
        });
    }

    render() {
        const newWeightRepsDataArr = JSON.parse(JSON.stringify(this.props.weightRepsDataArr));
        for (let i = newWeightRepsDataArr.length; i < this.props.sets; i++) {
            newWeightRepsDataArr.push({weight: 0, reps: 0});
        }
        return (
            <Modal
                visible={this.props.showEditWeightReps}
                transparent
                onRequestClose={() => this.props.handleCloseWeightModal("showEditWeightReps", false)}>
                <View style={{...styles.modalOuterContainer, top: 120}}>
                    <View style={styles.modalInnerContainer}>
                        <Text
                            style={{
                                color: "#66666f",
                                fontSize: 16,
                                marginLeft: 10,
                                marginBottom: 15,
                            }}>
                            Please edit the weight and rep numbers of these sets:
                        </Text>
                        <ScrollView style={{height: 160}} keyboardShouldPersistTaps={'always'}>
                            <Text
                                style={{
                                    color: "#66666f",
                                    fontSize: 14,
                                    marginLeft: 10,
                                    marginBottom: 15,
                                }}>
                                weight(0-100KG) reps(0-50)
                            </Text>
                            {newWeightRepsDataArr.map((item, index) => {
                                return (
                                    <View style={styles.dataContainer}
                                          key={index + item.weight + index + Math.random()}>
                                        <Text style={{
                                            alignItems: "center",
                                            marginTop: width * 0.02,
                                            marginLeft: width * 0.02,
                                            marginBottom: width * 0.02, height: 25,
                                            color: "#777"
                                        }}>{index + 1}:</Text>
                                        <TextInput
                                            style={{...styles.weightTextInput, flex: 0.5}}
                                            value={this.state[`weightText${index}`]}
                                            // value={this.state.weightText[index]}
                                            placeholder="0-300 (KG)"
                                            multiline={true}
                                            defaultValue={item.weight || ""}
                                            onChangeText={//阻止主动重新渲染
                                                text => {
                                                    setTimeout(() => {
                                                        const weightText = JSON.parse(JSON.stringify(this.state.weightText));
                                                        weightText[index] = text;
                                                        this.setState({
                                                            [`weightText${index}tmp`]: text
                                                            // weightText
                                                        })
                                                    }, 100)
                                                }
                                            }
                                            onBlur={async () => {
                                                const length = newWeightRepsDataArr.length;
                                                await this.setState({
                                                    blur: true,
                                                    // [`weightText${index}`]: this.state[`weightText${index}tmp`]
                                                });
                                                for (let i = 0; i < length; i++) {
                                                    this.setState({
                                                        [`weightText${i}`]: [`weightText${i}tmp`]
                                                    })
                                                }
                                            }}
                                        />
                                        <TextInput
                                            style={{...styles.weightTextInput, flex: 0.4}}
                                            value={this.state.repsText[index]}
                                            // autoFocus={true}
                                            defaultValue={item.reps || ""}
                                            placeholder="0-50 reps"
                                            onChangeText={
                                                text => {
                                                    setTimeout(() => {
                                                        const repsText = JSON.parse(JSON.stringify(this.state.repsText));
                                                        repsText[index] = text;
                                                        this.setState({
                                                            repsText
                                                        })
                                                    }, 100)
                                                }
                                            }
                                        />
                                    </View>)
                                // }
                            })}
                        </ScrollView>
                        <View
                            style={{flexDirection: "row", justifyContent: "space-around"}}>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    style={styles.modalButton}
                                    color="#00cccc"
                                    title="Confirm"
                                    onPress={async () => {
                                        await this.props.editWeightRepsInWorkout({
                                            time: this.props.time,
                                            weightText: this.state.weightText,
                                            repsText: this.state.repsText,
                                        });
                                        await this.props.handleCloseWeightModal("showEditWeightReps", false);
                                    }}
                                />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    color="#00cccc"
                                    style={styles.modalButton}
                                    title="Cancel"
                                    onPress={() => {
                                        this.props.handleCloseWeightModal("showEditWeightReps", false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        position: "absolute",
        left: width * 0.148,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 8,
    },
    modalInnerContainer: {
        flex: 1,
        width: width * 0.7,
        backgroundColor: "white",
        paddingTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    modalButtonContainer: {
        width: 0.25 * width,
    },
    weightTextInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "rgba(204,152,153,0.1)",
        height: 25,
        alignItems: 'center',
        color: "#666",
    },
    dataContainer: {
        flex: 1,
        flexDirection: "row",
    }
});
