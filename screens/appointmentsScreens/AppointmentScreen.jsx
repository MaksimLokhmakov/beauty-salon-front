import React, { useEffect } from "react";
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

  const [normalNeedles, setNormalNeedles] = React.useState(null);
  const [specialNeedles, setSpecialNeedles] = React.useState(null);

  React.useEffect(() => {
    setSpecialNeedles(null);
  }, [normalNeedles]);

  React.useEffect(() => {
    setNormalNeedles(null);
  }, [specialNeedles]);

  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={appointment.client} appointment />
      <View style={Screen.infoCardWrapper}>
        <Table
          title="Мастер:"
          firstLabel="имя/фам."
          firstValue={() => <Text>{appointment.master.name}</Text>}
          secondLabel="сотовый"
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
          <View style={{ height: 55 }}>
            <Table
              width={25}
              title="Обыч. иглы"
              one
              firstValue={() => (
                <TouchableOpacity
                  onPress={() =>
                    normalNeedles === 1
                      ? setNormalNeedles(null)
                      : setNormalNeedles(1)
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
              firstLabel="№1"
            />
          </View>
          <View style={{ height: 30 }}>
            <Table
              width={25}
              one
              firstLabel="№2"
              firstValue={() => (
                <TouchableOpacity
                  onPress={() =>
                    normalNeedles === 2
                      ? setNormalNeedles(null)
                      : setNormalNeedles(2)
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
            />
          </View>
          <Table
            width={25}
            firstLabel="№3"
            firstValue={() => (
              <TouchableOpacity
                onPress={() =>
                  normalNeedles === 3
                    ? setNormalNeedles(null)
                    : setNormalNeedles(3)
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
            secondLabel="№4"
            secondValue={() => (
              <TouchableOpacity
                onPress={() =>
                  normalNeedles === 4
                    ? setNormalNeedles(null)
                    : setNormalNeedles(4)
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
          <View style={{ height: 55 }}>
            <Table
              width={25}
              title="Изол. иглы"
              one
              firstValue={() => (
                <TouchableOpacity
                  onPress={() =>
                    specialNeedles === 1
                      ? setSpecialNeedles(null)
                      : setSpecialNeedles(1)
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
              firstLabel="№1"
            />
          </View>
          <View style={{ height: 30 }}>
            <Table
              width={25}
              one
              firstLabel="№2"
              firstValue={() => (
                <TouchableOpacity
                  onPress={() =>
                    specialNeedles === 2
                      ? setSpecialNeedles(null)
                      : setSpecialNeedles(2)
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
            />
          </View>
          <Table
            width={25}
            firstLabel="№3"
            firstValue={() => (
              <TouchableOpacity
                onPress={() =>
                  specialNeedles === 3
                    ? setSpecialNeedles(null)
                    : setSpecialNeedles(3)
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
            secondLabel="№4"
            secondValue={() => (
              <TouchableOpacity
                onPress={() =>
                  specialNeedles === 4
                    ? setSpecialNeedles(null)
                    : setSpecialNeedles(4)
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
        <View style={{ top: 0, height: 55 }}>
          <Table
            width={185}
            title="Доп. услуги"
            firstLabel="инъекционная анестезия    "
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
            secondLabel=""
            secondValue={() => <Text></Text>}
          />
        </View>
        <Table
          width={185}
          firstLabel="аппликационная анестезия"
          firstValue={() => (
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
          secondLabel="окрашивание                        "
          secondValue={() => (
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