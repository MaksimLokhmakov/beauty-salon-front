import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
  Text,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { AppointmentCard, PersonInfoHeader, Table } from "../../components";
import Screen from "../style";

// TODO:  ДОБАВИТЬ ОБЩУЮ СУММУ ОПЛАТЫ ЗА ПРИЕМ
// TODO: ДОБАВИТЬ ПРИБЫЛЬ САЛОНА ЗА ПРИЕМ И ПРИБЫЛЬ МАСТЕРА ЗА ПРИЕМ
// TODO: ПЕРЕДЕЛАТЬ ИЗМЕНИЯЕМЫЕ ПОЛЯ НА ИНПУТЫ
// TODO: ДОБАВИТЬ КНОПНКУ "ЗАВЕРШИТЬ ПРИЕМ В КОНЕЦ СТРАНИЦЫ"

const AppointmentScreen = ({ route }) => {
  const { appointment } = route.params;

  const phoneValue = () => (
    <TouchableOpacity
      onPress={() => Linking.openURL(`tel:${appointment.master.tel}`)}
    >
      <Text style={{ fontSize: 14, color: "#1976D2" }}>
        {appointment.master.tel}
      </Text>
    </TouchableOpacity>
  );

  const [checked, setChecked] = React.useState({
    injection: false,
    ointment: false,
    coloring: false,
  });

  //!  так передавать на сервер
  //!  "needle": {
  //! "type": "isolated/nonisolated"
  //! "number": "3"
  //!  }

  const [normalNeedles, setNormalNeedles] = React.useState(null);
  const [specialNeedles, setSpecialNeedles] = React.useState(null);

  const setNeedls = (setState, nullifyState, needle) => {
    setState((prev) => (prev === needle ? null : needle));
    nullifyState(null);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={appointment.client} appointment />
      <View style={Screen.infoCardWrapper}>
        <Table
          numberOfRows={2}
          title="Мастер:"
          firstLabel={() => "имя/фам."}
          firstValue={() => <Text>{appointment.master.name}</Text>}
          secondLabel={() => "сотовый"}
          secondValue={phoneValue}
        />
      </View>
      <AppointmentCard item={appointment} />

      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ ...Screen.infoCardWrapper, marginRight: 5 }}>
          <Table
            numberOfRows={4}
            title="Обыч. иглы"
            firstLabel={() => "№1"}
            firstValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setNormalNeedles, setSpecialNeedles, 1)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={normalNeedles === 1 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
            secondLabel={() => "№2"}
            secondValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setNormalNeedles, setSpecialNeedles, 2)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={normalNeedles === 2 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
            thirdLabel={() => "№3"}
            thirdValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setNormalNeedles, setSpecialNeedles, 3)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={normalNeedles === 3 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
            fourthLabel={() => "№4"}
            fourthValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setNormalNeedles, setSpecialNeedles, 4)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={normalNeedles === 4 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ ...Screen.infoCardWrapper, marginLeft: 5 }}>
          <Table
            numberOfRows={4}
            title="Изол. иглы"
            firstLabel={() => "№1"}
            firstValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setSpecialNeedles, setNormalNeedles, 1)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={specialNeedles === 1 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
            secondLabel={() => "№2"}
            secondValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setSpecialNeedles, setNormalNeedles, 2)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={specialNeedles === 2 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
            thirdLabel={() => "№3"}
            thirdValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setSpecialNeedles, setNormalNeedles, 3)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={specialNeedles === 3 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
            fourthLabel={() => "№4"}
            fourthValue={() => (
              <TouchableOpacity
                onPress={() =>
                  setNeedls(setSpecialNeedles, setNormalNeedles, 4)
                }
              >
                <FontAwesome5
                  style={{ marginRight: 5 }}
                  name="check"
                  size={18}
                  color={specialNeedles === 4 ? "#5bdd8f" : "#ebecef"}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View style={Screen.infoCardWrapper}>
        <Table
          numberOfRows={3}
          title="Доп. услуги"
          firstLabel={() => "инъекционная анестезия"}
          firstValue={() => (
            <TouchableOpacity
              onPress={() =>
                setChecked((prev) => ({
                  ...prev,
                  injection: !prev.injection,
                }))
              }
            >
              <FontAwesome5
                style={{ marginRight: 5 }}
                name="check"
                size={18}
                color={checked.injection ? "#5bdd8f" : "#ebecef"}
              />
            </TouchableOpacity>
          )}
          secondLabel={() => "аппликационная анестезия"}
          secondValue={() => (
            <TouchableOpacity
              onPress={() =>
                setChecked((prev) => ({
                  ...prev,
                  ointment: !prev.ointment,
                }))
              }
            >
              <FontAwesome5
                style={{ marginRight: 5 }}
                name="check"
                size={18}
                color={checked.ointment ? "#5bdd8f" : "#ebecef"}
              />
            </TouchableOpacity>
          )}
          thirdLabel={() => "окрашивание"}
          thirdValue={() => (
            <TouchableOpacity
              onPress={() =>
                setChecked((prev) => ({
                  ...prev,
                  coloring: !prev.coloring,
                }))
              }
            >
              <FontAwesome5
                style={{ marginRight: 5 }}
                name="check"
                size={18}
                color={checked.coloring ? "#5bdd8f" : "#ebecef"}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default AppointmentScreen;
