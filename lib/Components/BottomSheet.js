import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import BottomSheetModal, {
  BottomSheetScrollView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { setBottomSheetIndex, showBottomSheetContainer } from "../../src/redux/actions";

// import colors from "../../constants/colors";

export default function ({
  points = ["3%"],
  children,
  scrollable = false,
  allowhide=true,
  defaultPointIndex = 0,
}) {
  const dispatch = useDispatch();
  const { bottomSheetIndex, showBottomSheet } = useSelector((state) => state.appState);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => points, [points]);


  

  useEffect(() => {
    if (bottomSheetModalRef.current != null) {
      if(allowhide){
        if (showBottomSheet) {
          bottomSheetModalRef.current.expand();
        } else {
          bottomSheetModalRef.current.close();
        }
      }
     
    }
  }, [showBottomSheet]);

  // Handling Bottom Sheet Position from Redux
  const handleSheetChanges = useCallback((index) => {
    if(index == 0 && allowhide ){
      dispatch(showBottomSheetContainer(false));
    }
   
  }, []);

  // renders
  return (
    <BottomSheetModal
      style={styles.bottomSheetModal}
      enabledGestureInteraction={true}
      ref={bottomSheetModalRef}
      isVisible={showBottomSheet}
      index={defaultPointIndex}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      
    >
      {scrollable ? (
        <BottomSheetScrollView >{children}</BottomSheetScrollView>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  bottomSheetModal: {
    borderTopWidth: 0,
    borderTopLeftRadius:50,
    borderTopRightRadius:50
    // borderTopColor: colors.borderLight,
  },
});
