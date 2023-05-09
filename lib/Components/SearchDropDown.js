import { StyleSheet, Text, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import { postDataApi, throttle } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setMapData } from "../../src/redux/actions";

// var itemss = [
//   {
//     id: 1,
//     name: "JavaScript",
//   },
//   {
//     id: 2,
//     name: "Java",
//   },
//   {
//     id: 3,
//     name: "Ruby",
//   },
//   {
//     id: 4,
//     name: "React Native",
//   },
//   {
//     id: 5,
//     name: "PHP",
//   },

// ];

const SearchDropDown = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({});

  const [backendData,setBackendData] = useState([]);


  const { mapData } = useSelector((state) => state.mapData);
  const [itemss, setItemss] = useState([]);
  const dispatch = useDispatch();
  
  const fetchSearchData = async (val) => {
    let data = {
      text: val,
    };
    try {
      const response = await postDataApi("getTopParkings", data, true);
    
      if (response?.status) {
      
        if (response?.data?.data.length != 0) {
          const newArray = response?.data?.data.map((item) => {
            return { id: item.id, name: item.address };
          });
          setData(newArray);
          
        // //   setData(newArray);
          setBackendData(response?.data?.data)
        //   dispatch(setMapData({ backendData: response?.data?.data }));
        }
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    }
  };

//   useEffect(() => {
//     const newArray = backendData.map((item) => {
//         return { id: item.id, name: item.address };
//       });
//       console.log(newArray,"sd");
//       setData(newArray);
//   }, [backendData])
  
  const throttledFunction = throttle(fetchSearchData, 1500);

  useEffect(() => {
    throttledFunction(search);
  }, [search]);

 

  let dropdownKey = selected ? selected.id : 0;

  return (
    <Fragment>
      <SearchableDropdown
      key={dropdownKey} // Add key prop
        onItemSelect={(item) => {
          setSelected(item)
        }}
        selectedItems={selected}
        containerStyle={{
          padding: 0,
          widtH: "100%",
          flex: 1,
          backgroundColor: "#08452310",
          borderRadius: 15,
        }}
        // onRemoveItem={(item, index) => {
        //   const items = selected.filter((sitem) => sitem.id !== item.id);
        //   setSelected(items);
        // }}
        resetValue={false}
        value={search}
        itemStyle={{
          padding: 15,

          marginTop: 5,
          margin: 0,
          backgroundColor: "#08452310",
          borderColor: "lightgrey",
          borderWidth: 0,
          borderRadius: 5,
          borderWidth: 1,
          zIndex: 10,
        }}
        itemTextStyle={{ color: "#222" }}
        itemsContainerStyle={{ backgroundColor: "white", margin: 0 }}
        items={data}
        defaultIndex={2}
        textInputProps={{
          placeholder: "Where Do You Want To Go Today?",
          placeholderTextColor: "#a8ada9",
          underlineColorAndroid: "transparent",
          style: {
            padding: 15,
          },
          onTextChange: (text) => setSearch(text),
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </Fragment>
  );
};

export default SearchDropDown;

const styles = StyleSheet.create({});
