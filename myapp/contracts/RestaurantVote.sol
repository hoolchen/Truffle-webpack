pragma solidity ^0.4.17;
contract RestaurantVote {
    //Restaurant
    struct restaurant {
        bytes32 name;
        uint mark;
        uint customers_number;
        uint good_mark;
        uint middle_mark;
        uint bad_mark;
        mapping(address=>uint) customer_mark;
        mapping(uint=>address) customer_exit;
    }
    
    //customer
    struct customer {
        address addr;
        bytes32 name;
        uint id;
    }
    
    mapping(uint=>restaurant) restaurants;
    mapping(uint=>customer) customers;
    uint customers_number;
    uint restaurants_number;
    
    //init
    constructor() public{
        customers_number = 0;
        restaurants_number = 0;
    }
    
    //judge customer exits
    function iscustomerOn(address addr) view public returns(bool) {
        for(uint i = 0; i < customers_number; i++) {
            if (customers[i].addr == addr) {return true;}
        }
        return false;
    }
    
    //judge restaurant exits
    function isrestaurantOn(bytes32 name) view public returns(bool) {
        for (uint i = 0; i < restaurants_number; i++) {
            if (restaurants[i].name == name) { return true; }
        }
        return false;
    }
    
    //find customer
    function Findcustomer(address addr) view public returns(uint) {
        for (uint i = 0; i < customers_number; i++) {
            if (customers[i].addr == addr) { return i; }
        }
    }
    
    //find restaurant
    function FindRestaurant(bytes32 name) view public returns(uint) {
        for (uint i = 0; i < restaurants_number; i++) {
            if (restaurants[i].name == name) { return i;}
        }
    }
    
    //judge restaurant has this customer
    function isCustomerOnThisRestaurant(bytes32 name, address addr) view public returns(bool) {
        uint pos = FindRestaurant(name);
        for (uint i = 0; i < restaurants[pos].customers_number; i++) {
            if (restaurants[pos].customer_exit[i] == addr) { return true; }
        }
        return false;
    }
    
    //create customer
    function setcustomer(bytes32 _name) public returns(uint){
        // if (iscustomerOn(msg.sender)) return false;
        // customers_number = customers_number + 1;
        // customers[customers_number] = customer(msg.sender, _name, customers_number);
        // return customers_number;
        uint a = sc(_name);
        return a;
    }

    function sc(bytes32 _name) internal returns(uint){
        customers_number = customers_number + 1;
        customers[customers_number] = customer(msg.sender, _name, customers_number);
        return customers_number;
    }
    
    //create restaurant
    function setrestaurant(bytes32 _name) public returns(bool){
        if (isrestaurantOn(_name)) return false;
        
        restaurants[restaurants_number].name = _name;
        restaurants[restaurants_number].mark = 0;
        restaurants[restaurants_number].good_mark = 0;
        restaurants[restaurants_number].middle_mark = 0;
        restaurants[restaurants_number].bad_mark = 0;
        restaurants[restaurants_number].customers_number = 0;
        restaurants_number++;
        return true;
    }
    
    //vote
    function vote(uint mark, bytes32 name, uint gmd_mark) public returns(bool){
        uint pos;
        
        if (restaurants_number == 0) return false;
        pos = FindRestaurant(name);
        
        if(isCustomerOnThisRestaurant(name, msg.sender)) return false;
        
        if (gmd_mark == 0) restaurants[pos].bad_mark++;
        else if (gmd_mark == 1) restaurants[pos].middle_mark++;
        else restaurants[pos].good_mark++;
        
        uint allmark = restaurants[pos].mark * restaurants[pos].customers_number + mark;
        restaurants[pos].customers_number++;
        restaurants[pos].mark = allmark / restaurants[pos].customers_number;
        restaurants[pos].customer_mark[msg.sender] = mark;
        restaurants[pos].customer_exit[restaurants[pos].customers_number - 1] = msg.sender;
        
        return true;
    }
    
    //                                 get from customer
    //get customerid
    function getcustomerId() view public returns(uint) {
        uint pos = Findcustomer(msg.sender);
        return customers[pos].id;
    }
    //get customername
    function getcustomerName() view public returns(bytes32) {
      uint pos = Findcustomer(msg.sender);
        return customers[pos].name;
    }
    //get customeraddress
    function getcustomerAddr() view public returns(address) {
        uint pos = Findcustomer(msg.sender);
        return customers[pos].addr;
    }
    //                                         end

    
    //                                  get from restaurant
    //get restaurantmark
    function getRestaurantMark(bytes32 name) view public returns(uint) {
        uint pos = FindRestaurant(name);
        return restaurants[pos].mark;
    }
    //get restaurantgoodmark
    function getRestaurantGoodMark(bytes32 name) view public returns(uint) {
        uint pos = FindRestaurant(name);
        return restaurants[pos].good_mark;
    }
    //get restaurantmiddlemark
    function getRestaurantMiddleMark(bytes32 name) view public returns(uint) {
        uint pos = FindRestaurant(name);
        return restaurants[pos].middle_mark;
    }
    //get restaurantbadmark
    function getRestaurantBadMark(bytes32 name) view public returns(uint) {
        uint pos = FindRestaurant(name);
        return restaurants[pos].bad_mark;
    }
    //get restaurant's customer number
    function getRestaurantcustomerNumber(bytes32 name) view public returns(uint) {
        uint pos = FindRestaurant(name);
        return restaurants[pos].customers_number;
    }
    //get customer's name in restaurant
    function getRestaurantcustomerName(bytes32 name, uint x) view public returns(bytes32) {
        uint pos;
        pos = FindRestaurant(name);
        address addr = restaurants[pos].customer_exit[x];
        pos = Findcustomer(addr);
        bytes32 customer_name = customers[pos].name;
        return customer_name;
    }
    //get customer's mark in restaurant
    function getRestaurantcustomerMark(bytes32 name, uint x) view public returns(uint) {
        uint pos = FindRestaurant(name);
        return restaurants[pos].customer_mark[restaurants[pos].customer_exit[x]];
    }
    //                                         end
    
    //                                  get from public
    function getRestaurantNumber() view public returns(uint) {
        return restaurants_number;
    }
    function getcustomerNumber() view public returns(uint) {
        return customers_number;
    }
    //                                          end
}