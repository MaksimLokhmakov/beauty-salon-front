import React from "react";
import { View, FlatList, Text } from "react-native";
import { Context } from "../../context";

import { PersonInfoHeader, AddModal, Table, Label } from "../../components";
import Screen from "../style";

const ClientSrceen = ({ route }) => {
  const { visibleClientsReductModal } = React.useContext(Context);

  const { client } = route.params;
  const [currentClient, setCurrentClient] = React.useState(client);
  const orders = currentClient.orders;

  return (
    <View
      style={{ ...Screen.wrapper, backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader
        item={currentClient}
        wrapperStyle={{
          marginBottom: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.03,
          shadowRadius: 4.65,

          elevation: 6,
        }}
      />

      {orders.length > 0 && (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          data={orders}
          renderItem={({ item }) => {
            console.log(item);
            const tableData = {
              title: item.start.split(" ")[0],
              data: [
                {
                  label: <Label width={60}>Время</Label>,
                  value: (
                    <Text>
                      {item.start.split(" ")[1] +
                        " - " +
                        item.finish.split(" ")[1]}
                    </Text>
                  ),
                },
                {
                  label: <Label width={60}>Мастер</Label>,
                  value: <Text>{item.master.name}</Text>,
                },
                {
                  label: <Label width={60}>Область</Label>,
                  value: <Text>{item.area}</Text>,
                },
              ],
            };

            return (
              <View
                style={[
                  Screen.infoCardWrapper,
                  {
                    marginTop: 10,
                    marginBottom: 0,
                  },
                ]}
              >
                <Table tableValues={tableData} />
              </View>
            );
          }}
        />
      )}

      <AddModal
        adit
        visible={visibleClientsReductModal}
        item={currentClient}
        setChanges={setCurrentClient}
      />
    </View>
  );
};

export default ClientSrceen;
