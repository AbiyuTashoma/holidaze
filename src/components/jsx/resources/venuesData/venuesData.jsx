import GetApi from "../../../js/getApi";
import { baseUrl } from "../../../js/constants";
import useApi from "../../store/apiStore";
import { shallow } from "zustand/shallow";

function ProductsData() {

  const { venues, isLoading, isError } = useApi(
    (state) => ({
      venues: state.venues,
      isLoading: state.isLoading,
      isError: state.isError,
    }),
    shallow
  );

  console.log("products data");

  GetApi(baseUrl);
  console.log("products data 2");

  // if (isLoading || !products) {
  //   return (<div>Loading</div>);
  // }

  // if (isError) {
  //   return (<div>Error</div>);
  // }

  return (<div>Api Data</div>);
}

export default ProductsData;