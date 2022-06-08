  // Allows the contract to update the storage after transfering tokens.
  // function _afterTokenTransfer(
  //   address operator,
  //   address from,
  //   address to,
  //   uint256[] memory ids,
  //   uint256[] memory amounts,
  //   bytes memory data
  // ) internal virtual override {
  //   // @TODO: Turn me on.
  //   super._afterTokenTransfer(operator, from, to, ids, amounts, data);

  //   uint256 tokenId = ids[0];

  //   if (tokenId != token.fungibleTokenId) {
  //     Structs.Participant memory fromParticipant = store.handleReadParticipant(
  //       from
  //     );
  //     Structs.Participant memory toParticipant = store.handleReadParticipant(
  //       to
  //     );

  //     if (fromParticipant.isPresent) {
  //       Structs.Participant memory _fromParticipant = utils
  //         .handleRemoveTokenIdFromParticipant(fromParticipant, tokenId);
  //       store.handleUpdateParticipant(from, _fromParticipant);
  //     }

  //     if (toParticipant.isPresent) {
  //       Structs.Participant memory _toParticipant = utils
  //         .handleAddTokenIdToParticipant(toParticipant, tokenId);
  //       store.handleUpdateParticipant(to, _toParticipant);
  //     }

  //     // @TODO: Provide fallback for when participant dont exist.
  //   }
  // }
