import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id:
    "AZ-nVmwN2QxNlCXw_Xs7jssTQidatRktP4aRu7UYLbdIE0Q4l4jtN3_KfK_jOAs_1TIFrJXfb8yv64BI",
  client_secret:
    "ENQBC-0qD5zBJI5rP5DQ-90X9Xw17nUUB11qcUyfh5WJzrxKkhfm9TBBsmd8UpdvjUtvRatqeli1-8V4",
});

export default paypal
