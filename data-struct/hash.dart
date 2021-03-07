

int hashFunc(String strings, int size) {
  int hashCode = 0;
  for (int s in strings.codeUnits) {
      hashCode = 37 * hashCode + s;
  }
  return hashCode % size;
}

bool haInter(int size) {
  for(int i = 2; i < size;i++) {
    if (size % i == 0 ) {
        return false;
    }
  }
  return true;
}

int getPrmse(int size) {
  while(!haInter(size)) {
    size++;
  }
  return size;
}

class HashMap {

   int size;
   List<List<Map<dynamic,dynamic>>> list;
   int len = 0;

  HashMap({size = 16}) {
    this.size = size;
    this.list = List.generate(this.size, (index) => [] );
  }

  set(dynamic key, dynamic value) {
    int hashCode = hashFunc(key, this.size);
    List<Map<dynamic,dynamic>> linkedList = this.list[hashCode];
    linkedList.add({key:value});
    this.list[hashCode] = linkedList;
    this.len ++;

    if (this.len  > this.size * 0.75 ) {
      // 扩容
      int newSize = this.size * 2;
      newSize = getPrmse(newSize);
      this.resize(newSize);
    }
  }

  dynamic get(dynamic key){
    int hashCode = hashFunc(key, this.size);
    List<Map<dynamic,dynamic>> linkedList = this.list[hashCode];
    for (Map map in linkedList) {
      if (map.containsKey(key)) {
        return map[key];
      }
    }
    return null;
  }

 bool delete(dynamic key){
    int hashCode = hashFunc(key, this.size);
    List<Map<dynamic,dynamic>> linkedList = this.list[hashCode];
    for (Map map in linkedList) {
      if (map.containsKey(key)) {
        map.remove(key);
        this.len--;
        return true;
      }
    }
    return false;
  }


  resize(int size) {

    var oldList = this.list;

    this.list = [];
    this.size = size;

    for(List l in oldList) {
      for (Map m in l) {
        this.set(m.keys.first, m.values.first);
      }
    }
  }

  int length() {
    return this.len;
  }

  bool isEmpty() {
    return this.size == 0;
  }

}