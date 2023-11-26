import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
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
    flex: 1,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 5,
    width: "100%",
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
    marginRight: 30,
    marginBottom: 30,
    marginLeft: 10,
    zIndex: 1000,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    width: "95%",
  },
});
