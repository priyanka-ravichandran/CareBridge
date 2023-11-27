import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    width: "100%",
  },

  // flat list styles
  flatListStyle: {
    width: "100%",
  },
  flatListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  flatListItemLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  flatListItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  //pressable styles
  pressableStyle: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
  },
  pressableText: {
    color: "white",
    textAlign: "center",
  },

  //text input
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    color: "black",
    marginBottom: 20,
  },
  inputText: {
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },

  autocompleteContainer: {
    backgroundColor: "#E6E6E6",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    flexGrow: 1,
    marginBottom: 20,
    zIndex: 1000,
    borderRadius: 5,
    width: "100%",
  },

  // errors

  errorText: {
    color: "red",
    textAlign: "left",
    width: "100%",
  },

  // modal
  modalButton: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop : 5
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalClose:{
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
