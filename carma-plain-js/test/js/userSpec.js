/* global userService,describe,it,expect */

describe('userService', function () {
    'use strict';

    describe('building an api call url', function () {
        it('should build the correct url with parameters passed in', function () {
            var longitude = 1234;
            var latitude = -5678;
            var page = 3;

            var expectedResult = 'https://api.car.ma/api/rtr/v1.0/object/trip/nearbyUsers?originLon=1234&originLat=-5678&pageSize=5&pageNum=3';

            expect(userService.buildUrl(longitude, latitude, page)).toEqual(expectedResult);
        });

        it('should not add a page query if page is not greater that zero', function () {
            var longitude = -1234;
            var latitude = 5678;
            var page = 0;

            var expectedResult = 'https://api.car.ma/api/rtr/v1.0/object/trip/nearbyUsers?originLon=-1234&originLat=5678&pageSize=5';

            expect(userService.buildUrl(longitude, latitude, page)).toEqual(expectedResult);
        });
    });

    describe('getting and settign the user list', function () {
        var testData = JSON.parse('{"searchId":590263,"nearbyUsers":[{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1374659491000},"firstName":"Richard","alias":"Richard S.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/kl9ncboudcjzwyedcgsf.jpg","userHasPhoto":false,"userId":692717899,"phoneNumber":"+353866097677","lastSeen":1374659517000,"relativeDistance":420.8818506234076,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Muskerry Estate, Ballincollig, Co. Cork, Ireland","timestamp":1399495135000},"firstName":"Mark","alias":"Mark O.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/slnejjllbtxzfbhkwcep.jpg","userHasPhoto":true,"userId":1042282198,"phoneNumber":"+353852755393","lastSeen":1399495665000,"relativeDistance":512.5953151519399,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Ballincollig, Co. Cork, Ireland","timestamp":1399325692000},"firstName":"Fabrizio","alias":"Fabrizio C.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/kmtfwmq9ifpb8fdwllk7.jpg","userHasPhoto":true,"userId":1659533820,"phoneNumber":"+353873929420","lastSeen":1399325732000,"relativeDistance":529.6401051769755,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1383049252000},"firstName":"Damian","alias":"Damian E.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/nm4rfckqhr9gpaoh2e2f.jpg","userHasPhoto":true,"userId":247608246,"phoneNumber":"+353877381629","lastSeen":1383049252000,"relativeDistance":538.1612335886606,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1376394981000},"firstName":"Breffni","alias":"Breffni M.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/cilfsbfffur3vvlwvnv5.jpg","userHasPhoto":true,"userId":8255,"phoneNumber":"+353831210603","lastSeen":1378800261000,"relativeDistance":728.9914076343745,"rideSharing":false},{"lastKnownLocation":{"address":"Lackenshoneen, Ballincollig, Co. Cork, Ireland","timestamp":1401464673000},"firstName":"Jen","alias":"Jen T.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/cftcferuw109omlcqie3.jpg","userHasPhoto":true,"userId":1380836947,"phoneNumber":"+353861028577","lastSeen":1401629306000,"relativeDistance":795.851040253263,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Ballincollig, Co. Cork, Ireland","timestamp":1390859244000},"firstName":"Stephen","alias":"Stephen O.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/n8pwg318xeejjq4m9vax.jpg","userHasPhoto":true,"userId":392575836,"phoneNumber":"+353863900956","lastSeen":1390859245000,"relativeDistance":888.7902735706172,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1387788698000},"firstName":"Patrick","alias":"Patrick O.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/eorkjiegcqhwmrdcd0mr.jpg","userHasPhoto":true,"userId":186318293,"phoneNumber":"+353831111111","lastSeen":1387788807000,"relativeDistance":888.9664814738635,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Ballincollig, Co. Cork, Ireland","timestamp":1399015710000},"firstName":"Amit","alias":"Amit C.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/yhmllbhlrlxcosoepos5.jpg","userHasPhoto":true,"userId":1200376771,"phoneNumber":"+353831877340","lastSeen":1399015710000,"relativeDistance":1027.3199121023997,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1369217789000},"firstName":"Claire","alias":"Claire D.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/zudlsmzzsmemr97umsye.jpg","userHasPhoto":true,"userId":1682166319,"phoneNumber":"+353861954219","lastSeen":1369217789000,"relativeDistance":1216.197685271715,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Ballincollig, Co. Cork, Ireland","timestamp":1392794802000},"firstName":"Luca","alias":"Luca T.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/bgeumjcgocgzwtxov713.jpg","userHasPhoto":true,"userId":1136539204,"phoneNumber":"+353864086801","lastSeen":1392794867000,"relativeDistance":1235.9408463589928,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1364598390000},"firstName":"Cormac","alias":"Cormac M.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/cq53mommom7zzwhiyaxl.jpg","userHasPhoto":true,"userId":1710134116,"phoneNumber":"+353877418166","lastSeen":1375350492000,"relativeDistance":1405.4472951508185,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1383776439000},"firstName":"Gavin","alias":"Gavin B.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/a6otuq2i9hdqjcvlhki3.jpg","userHasPhoto":true,"userId":1788812195,"phoneNumber":"+353868134174","lastSeen":1383776439000,"relativeDistance":1451.9881467721889,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1397725382000},"firstName":"Elena","alias":"Elena L.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/tdw416irchmbisydmccf.jpg","userHasPhoto":true,"userId":559257806,"phoneNumber":"+353877614365","lastSeen":1397744801000,"relativeDistance":1552.3157397745435,"rideSharing":false},{"lastKnownLocation":{"address":"Coolroe Meadows, Ballincollig, Co. Cork, Ireland","timestamp":1382909262000},"firstName":"Blathnaid","alias":"Blathnaid W.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/yzxgbwdrkwf9zgvjnjlr.jpg","userHasPhoto":false,"userId":2134266457,"phoneNumber":"+353868231631","lastSeen":1383120041000,"relativeDistance":1594.3121343679534,"rideSharing":false},{"lastKnownLocation":{"address":"Coolroe Meadows, Ballincollig, Co. Cork, Ireland","timestamp":1392766867000},"firstName":"Jane","alias":"Jane K.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/m1syhcdd397phcnuum99.jpg","userHasPhoto":true,"userId":1968496268,"phoneNumber":"+353872231164","lastSeen":1393234461000,"relativeDistance":1599.9895861597486,"rideSharing":false},{"lastKnownLocation":{"address":"Greenfield, Ballincollig, Co. Cork, Ireland","timestamp":1398379155000},"firstName":"Jane","alias":"Jane K.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/vklfihjk6nk3tbyurbit.jpg","userHasPhoto":true,"userId":717220819,"phoneNumber":"+353872231164","lastSeen":1398379154000,"relativeDistance":1613.4465838697563,"rideSharing":false},{"lastKnownLocation":{"address":"Carrigrohane, Greystones Villas, Ballincollig, Co. Cork, Ireland","timestamp":1396630309000},"firstName":"Dave","alias":"Dave L.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/tfh1olasccfrplguoohq.jpg","userHasPhoto":true,"userId":1746392792,"phoneNumber":"+353861546877","lastSeen":1397080454000,"relativeDistance":1637.8028540272292,"rideSharing":false},{"lastKnownLocation":{"address":"Coolroe, Ballincollig, Co. Cork, Ireland","timestamp":1399326537000},"firstName":"Cormac","alias":"Cormac O.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/z2rnsvtc31ves6ntse6o.jpg","userHasPhoto":true,"userId":1935276610,"phoneNumber":"+353866039730","lastSeen":1399326548000,"relativeDistance":1643.7276340045323,"rideSharing":false},{"lastKnownLocation":{"address":"Ballincollig, Co. Cork, Ireland","timestamp":1369912243000},"firstName":"M","alias":"M S.","photoURL":"https://cloudinary-a.akamaihd.net/avego/image/upload/ilnboh8wjvvrxn6okuwi.jpg","userHasPhoto":true,"userId":454672434,"lastSeen":1378223775000,"relativeDistance":1655.9457531556407,"rideSharing":false}],"paginator":{"totalPages":5,"totalResults":100,"rawTotalResults":111,"size":20,"number":1}}');

        it('should populate the user list with user objects', function () {
            userService.loadUserList(testData.nearbyUsers);
            expect(userService.getUserList().length).toEqual(20);
            userService.getUserList().forEach(function (user, index) {
                expect(user.alias).toEqual(testData.nearbyUsers[index].alias);
                expect(user.firstName).toEqual(testData.nearbyUsers[index].firstName);
                expect(user.photoURL).toEqual(testData.nearbyUsers[index].photoURL);
                expect(user.lastKnownLocation).toEqual(testData.nearbyUsers[index].lastKnownLocation);
                expect(user.lastSeen).not.toEqual(testData.nearbyUsers[index].lastSeen);
                expect(user.phoneNumber).toEqual(testData.nearbyUsers[index].phoneNumber);
            });
        });

        it('should reset the user list replacing existing items', function () {
            userService.loadUserList(testData.nearbyUsers);
            userService.loadUserList(testData.nearbyUsers);

            expect(userService.getUserList().length).toEqual(20);
        });

        it('should append to the user list', function () {
            userService.loadUserList(testData.nearbyUsers);
            userService.appendUserList(testData.nearbyUsers);

            expect(userService.getUserList().length).toEqual(40);
        });
    });
});