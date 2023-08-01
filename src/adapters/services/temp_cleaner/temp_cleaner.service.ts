import { Injectable } from "@nestjs/common";
import { readdir, rm, unlink } from "fs";
import { join } from "path";

@Injectable()
class Temp_cleaner_service {
  clean_temp() {
    readdir("temp", (err, files) => {
      if (err) {
        //...log new error
      }
      for (const file of files) {
        unlink(join("temp", file), (err) => {
          if (err) console.log(err);
        });
      }
    });
  }
}

export default Temp_cleaner_service;
