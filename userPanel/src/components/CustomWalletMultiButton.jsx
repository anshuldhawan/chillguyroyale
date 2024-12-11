import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { forwardRef } from "react";

const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Connect Wallet",
};

export const CustomWalletMultiButton = (props) => {
  return <BaseWalletMultiButton {...props} labels={LABELS} />;
};
